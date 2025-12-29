import { AddNomineeSearch } from "./add-nominee-search";
import { getAllNominees } from "@/db/query/get-all-nominees";

export default async function AddNomineePage() {
  const existingNominees = await getAllNominees();
  
  const existingTmdbIds = existingNominees.map(n => n.tmdbId).filter(Boolean) as string[];

  return (
    <div className="flex flex-col items-center overflow-y-hidden py-8 gap-8">
      <h1 className="text-2xl font-bold">Add Nominee</h1>
      <AddNomineeSearch existingTmdbIds={existingTmdbIds} />
    </div>
  );
}

