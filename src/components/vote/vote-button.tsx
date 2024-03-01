"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { voteForNomination } from "@/db/actions/vote-for-nomination";
import { cn } from "@/lib/utils";

export const VoteButton: FC<{
  categoryId: number;
  nominationId: number;
  isExistingVote: boolean;
  className?: string;
}> = ({ categoryId, nominationId, isExistingVote, className }) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return;
        setIsLoading(true);
        await voteForNomination(user?.id, categoryId, nominationId);
        setIsLoading(false);
      }}
      className={cn("bg-pink-600 mt-auto", className)}
      disabled={isExistingVote || isLoading}
    >
      {isExistingVote ? "Voted" : "Vote"}
    </Button>
  );
};
