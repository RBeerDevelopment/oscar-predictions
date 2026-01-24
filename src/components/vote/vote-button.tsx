"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { voteForNomination } from "@/db/actions/vote-for-nomination";
import { cn } from "@/lib/utils";

export const VoteButton: FC<{
  categoryId: string;
  nominationId: string;
  isExistingVote: boolean;
  className?: string;
  isVotingOver: boolean;
}> = ({ categoryId, nominationId, isExistingVote, className, isVotingOver }) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  if (isVotingOver) return null;
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
