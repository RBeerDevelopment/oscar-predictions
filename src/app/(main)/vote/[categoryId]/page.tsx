import { NomineeCard } from "@/components/vote/nominee-card";
import { getCategoryDetails } from "@/db/query/get-category-details";
import { getNomineesInCategory } from "@/db/query/get-nominees-in-category";
import { getExistingUserVote } from "@/db/query/get-existing-user-vote";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCategories } from "@/db/query/get-categories";
import { CategorySelect } from "@/components/vote/category-select";
import { CategorySidebarWrapper } from "@/components/vote/category-sidebar-wrapper";

export default async function VotePage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const categoryId = Number((await params).categoryId);
  if (isNaN(categoryId)) {
    redirect("/vote");
  }

  const { userId } = await auth();

  const [categories, categoryDetails, nomineesInCategory, existingUserVote] =
    await Promise.all([
      getCategories(userId ?? ""),
      getCategoryDetails(categoryId),
      getNomineesInCategory(categoryId),
      getExistingUserVote(userId ?? "", categoryId),
    ]);

  return (
    <div className="flex flex-col xl:flex-row gap-2 h-screen overflow-y-hidden">
      <CategorySidebarWrapper categoryId={categoryId} />
      <div className="xl:hidden block pt-2 px-4">
        <CategorySelect categoryId={categoryId} categories={categories} />
      </div>
      <div className="flex flex-col items-center py-4 px-4 md:px-16 overflow-y-scroll max-h-full">
        <h1 className="hidden xl:block text-2xl font-bold self-start">
          {categoryDetails?.name}
        </h1>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:py-4">
          {nomineesInCategory.map((nominee) => (
            <NomineeCard
              key={nominee.tmdbId}
              categoryId={categoryId}
              nominee={nominee}
              isExistingVote={existingUserVote === nominee.nominationId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
