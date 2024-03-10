"use client";
import { isAfterCeremony } from "@/common/utils/is-after";
import { FC, useEffect } from "react";
import { toast } from "sonner";

export const AfterCeremonyToast: FC = () => {
  useEffect(() => {
    const isVotingOver = isAfterCeremony();
    if (!isVotingOver) return;
    toast(
      "Voting is over! 🎉 Check your scores after the ceremony and come back next year!",
      {
        duration: Infinity,
        dismissible: false,
      }
    );
  }, []);
  return null;
};
