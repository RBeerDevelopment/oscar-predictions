import { getCategories } from "@/db/query/get-categories";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";
import { DoneIcon } from "./done-icon";

export const CategorySidebar: FC<{ categoryId: number }> = async ({
  categoryId,
}) => {
  const { userId } = auth();
  const categories = await getCategories(userId ?? "");

  return (
    <div className="xl:flex flex-col py-4 hidden w-2/3 max-w-xs bg-gray-50 shadow-md px-2 overflow-y-scroll gap-2 h-full">
      {categories.map((category) => (
        <Link
          href={`/vote/${category.id}`}
          key={category.id}
          className={`group py-3 px-3 rounded-lg ${
            categoryId === category.id ? "bg-pink-600 text-white" : ""
          } hover:bg-pink-400 hover:text-white transition-colors cursor-pointer`}
        >
          <div className="w-full flex flex-row gap-2">
            {category.name}{" "}
            {category.hasVoted && (
              <DoneIcon
                className={`group-hover:text-white ${
                  categoryId === category.id ? "text-white" : ""
                }`}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
