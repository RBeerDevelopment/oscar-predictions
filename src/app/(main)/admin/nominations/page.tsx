import { AddNominationForm } from "./add-nomination-form";
import { db } from "@/db/db";
import { getAllNominees } from "@/db/query/get-all-nominees";

export default async function AddNominationPage() {
  const [categories, nominees] = await Promise.all([
    db.query.categories.findMany({
      columns: { id: true, name: true },
    }),
    getAllNominees(),
  ]);

  return (
    <div className="flex flex-col items-center overflow-y-hidden py-8 gap-8">
      <h1 className="text-2xl font-bold">Add Nominations</h1>
      <AddNominationForm categories={categories} nominees={nominees} />
    </div>
  );
}

