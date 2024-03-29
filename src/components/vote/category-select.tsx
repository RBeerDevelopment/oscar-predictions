"use client";

import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export const CategorySelect: FC<{
  categoryId: number;
  categories: {
    hasVoted: boolean;
    id: number;
    name: string | null;
    type: "movie" | "person" | null;
  }[];
}> = ({ categoryId, categories }) => {
  const router = useRouter();

  return (
    <Select
      value={String(categoryId)}
      onValueChange={(selectedId) => router.push(`/vote/${selectedId}`)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
          ref.ontouchend = (e) => {
            e.preventDefault();
          };
        }}
      >
        {categories.map((category) => (
          <SelectItem key={category.id} value={String(category.id)}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
