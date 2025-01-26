import { buildImageUrl } from "@/common/utils/build-image-url";
import { db } from "../db";
import { encode } from "blurhash";
import sharp from "sharp";
import { nominees } from "../schema";
import { and, eq, isNotNull, isNull } from "drizzle-orm";

async function getImageBuffer(source: string) {
  const response = await fetch(source);
  const arrayBuffer = await response.arrayBuffer();
  const returnedBuffer = Buffer.from(arrayBuffer);

  const { info, data } = await sharp(returnedBuffer)
    .resize(16, 24, {
      fit: "inside",
    })
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    });

  const encoded = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    3,
    4
  );

  return encoded;
}

async function insertImageBlurhash() {
  console.time("insert");
  const data = await db.query.nominees.findMany({
    columns: {
      tmdbPosterPath: true,
      id: true,
    },
    where: and(
      isNull(nominees.tmdbPosterBlurhash),
      isNotNull(nominees.tmdbPosterPath)
    ),
  });

  if (!data) return;
  const entries = data.map((entry) => ({
    url: buildImageUrl(entry.tmdbPosterPath, true),
    id: entry.id,
  }));

  const blurhashPromises = entries.map((entry) => getImageBuffer(entry.url));
  const blurhashes = await Promise.all(blurhashPromises);

  const updatePromises = blurhashes.map((blurhash, idx) =>
    db
      .update(nominees)
      .set({ tmdbPosterBlurhash: blurhash })
      .where(eq(nominees.id, entries[idx].id ?? -1))
  );

  await Promise.all(updatePromises);
  console.timeEnd("insert");
}

insertImageBlurhash();
