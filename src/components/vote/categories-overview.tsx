import { getCategories } from "@/db/query/get-categories";
import { FC } from "react";
import { auth } from "@clerk/nextjs/server";
import { CategoryElement } from "./category-element";

export const CategoriesOverview: FC = async () => {
  const { userId } = await auth();
  const categories = await getCategories(userId ?? "");

  const sortedCategories = categories.sort((a, b) => {
    if (a.hasVoted && !b.hasVoted) return 1;
    if (!a.hasVoted && b.hasVoted) return -1;
    return 0;
  });

  return (
    <div className="flex flex-col items-center h-full w-full overflow-y-hidden">
      <div className="w-full px-2 flex flex-col gap-2 md:w-5/6 md:grid md:grid-cols-3 xl:grid-cols-4 overflow-y-scroll md:mt-2">
        {sortedCategories.map((category) => (
          <CategoryElement
            key={category.id}
            id={category.id}
            name={category.name}
            hasVoted={category.hasVoted}
          />
        ))}
      </div>
    </div>
  );
};
