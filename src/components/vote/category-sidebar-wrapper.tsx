import { getCategories } from "@/db/query/get-categories";
import { auth } from "@clerk/nextjs/server";
import { FC } from "react";
import { CategorySidebar } from "./category-sidebar";

export const CategorySidebarWrapper: FC<{ categoryId: number }> = async ({
  categoryId,
}) => {
  const { userId } = await auth();
  const categories = await getCategories(userId ?? "");

  return <CategorySidebar categoryId={categoryId} categories={categories} />;
};
