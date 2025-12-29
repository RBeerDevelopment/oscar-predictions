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
import { categories } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";


type MinimalCategory = Pick<InferSelectModel<typeof categories>, "id" | "name">;
type NominationWithNomineeAndCategory = {
  id: string;
  categoryId: string;
  nomineeName: string | null;
  nomineeId: string;
}

export const AdminSelectSection: FC<{
  nominations: NominationWithNomineeAndCategory[];
  categories: MinimalCategory[];
}> = ({ categories, nominations }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [selectedNominationId, setSelectedNominationId] = useState<string>();
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
        onValueChange={(newValue) => setSelectedCategoryId(newValue)}
      >
        <SelectTrigger className="w-[180px]">
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

      {selectedCategoryId !== undefined && (
        <Select
          onValueChange={(newValue) =>
            setSelectedNominationId(newValue)
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
                <SelectItem key={nomination.id} value={nomination.id}>
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
