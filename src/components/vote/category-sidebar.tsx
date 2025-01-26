"use client";

import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import { DoneIcon } from "./done-icon";

type Category = {
  hasVoted: boolean;
  id: number;
  name: string | null;
  type: "movie" | "person" | "song" | null;
};

const STORAGE_KEY = "category-sidebar-scroll";

export const CategorySidebar: FC<{
  categoryId: number;
  categories: Category[];
}> = ({ categoryId, categories }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const savedPosition = sessionStorage.getItem(STORAGE_KEY);
    if (savedPosition === null) return;

    containerRef.current.scrollTop = Number(savedPosition);
  }, []);

  const saveScrollPosition = () => {
    if (containerRef.current) {
      sessionStorage.setItem(
        STORAGE_KEY,
        String(containerRef.current.scrollTop)
      );
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={saveScrollPosition}
      className="xl:flex flex-col py-4 hidden w-2/3 max-w-xs bg-gray-50 shadow-md px-2 overflow-y-scroll gap-2 h-full"
    >
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
