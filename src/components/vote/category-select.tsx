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
  categoryId: string;
  categories: {
    id: string;
    name: string | null;
  }[];
}> = ({ categoryId, categories }) => {
  const router = useRouter();

  return (
    <Select
      value={categoryId}
      onValueChange={(selectedId) => router.push(`/vote/${selectedId}`)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
