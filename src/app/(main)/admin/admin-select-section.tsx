"use client";
import { FC, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { saveWinner } from "@/db/actions/save-winner";

export const AdminSelectSection: FC<{
  categories: {
    id: number;
    name: string | null;
  }[];
  nominations: {
    id: number;
    categoryId: number;
    nomineeName: string | null;
    nomineeId: number;
  }[];
}> = ({ categories, nominations }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedNominationId, setSelectedNominationId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    if (selectedCategoryId === undefined || selectedNominationId === undefined)
      return;
    setIsLoading(true);
    await saveWinner(selectedNominationId, selectedCategoryId);
    setSelectedCategoryId(undefined);
    setSelectedNominationId(undefined);
    setIsLoading(false);
  };
  return (
    <>
      <Select
        onValueChange={(newValue) => setSelectedCategoryId(Number(newValue))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedCategoryId !== undefined && (
        <Select
          onValueChange={(newValue) =>
            setSelectedNominationId(Number(newValue))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nominees" />
          </SelectTrigger>
          <SelectContent>
            {nominations
              .filter(
                (nomination) => nomination.categoryId === selectedCategoryId
              )
              .map((nomination) => (
                <SelectItem key={nomination.id} value={String(nomination.id)}>
                  {nomination.nomineeName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
      <Button
        disabled={isLoading || selectedNominationId === undefined}
        onClick={onSave}
      >
        {isLoading ? "Loading..." : "Save"}
      </Button>
    </>
  );
};
