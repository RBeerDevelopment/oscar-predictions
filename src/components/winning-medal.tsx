import { cn } from "@/lib/utils";
import { TrophyIcon } from "lucide-react";
import { FC } from "react";

export const WinningMedal: FC<{ className?: string; isInverted?: boolean }> = ({
  className,
  isInverted,
}) => {
  return (
    <div
      className={cn(
        "zigzag w-10 h-10 flex justify-center items-center",
        isInverted ? "bg-pink-500" : "bg-white",
        className
      )}
    >
      <TrophyIcon className={isInverted ? "text-white" : "text-pink-500"} />
    </div>
  );
};
