import { db } from "@/db/db";
import { AdminSelectSection } from "./admin-select-section";
import { auth } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { redirectToSignIn, userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID) {
    redirectToSignIn();
  }

  const categories = await db.query.categories.findMany({
    columns: { id: true, name: true },
  });

  const nominationsResult = await db.query.nominations.findMany({
    columns: {
      id: true,
    },
    with: {
      category: {
        columns: {
          id: true,
        },
      },
      nominee: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  const nominations = nominationsResult.map((nomination) => ({
    id: nomination.id,
    categoryId: nomination.category.id,
    nomineeName: nomination.nominee.name,
    nomineeId: nomination.nominee.id,
  }));

  return (
    <div className="flex flex-col items-center overflow-y-hidden py-2 gap-8">
      <p>Select a winner:</p>
      <AdminSelectSection categories={categories} nominations={nominations} />
    </div>
  );
}
