"use client";
import { FC, useEffect } from "react";
import { toast } from "sonner";

export const AfterCeremonyToast: FC<{ isVotingOver: boolean }> = ({ isVotingOver }) => {
  useEffect(() => {
    
    if (!isVotingOver) return;
    
    toast(
      "Voting is over! 🎉 Check your scores after the ceremony and come back next year!",
      {
        duration: Infinity,
        dismissible: false,
      }
    );
  }, [isVotingOver]);
  return null;
};
