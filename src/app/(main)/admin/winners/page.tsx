import { db } from "@/db/db";
import { AdminSelectSection } from "../admin-select-section";

export default async function WinnersPage() {

  const categories = await db.query.categories.findMany({
    columns: { id: true, name: true },
  });

  const nominationsResult = await db.query.nominations.findMany({
    columns: {
      id: true,
    },
    with: {
      nominee: {
        columns: {
          id: true,
          name: true
        }
      },
      category: {
        columns: {
          id: true,
        }
      }
    }
  });

  const nominations = nominationsResult.map((nomination) => ({
    id: nomination.id,
    categoryId: nomination.category?.id ?? "-1",
    nomineeName: nomination.nominee?.name ?? "Missing name",
    nomineeId: nomination.nominee?.id ?? "-1",
  }));

  return (
    <div className="flex flex-col items-center overflow-y-hidden py-8 gap-8">
      <h1 className="text-2xl font-bold">Select Winners</h1>
      <AdminSelectSection categories={categories} nominations={nominations} />
    </div>
  );
}

