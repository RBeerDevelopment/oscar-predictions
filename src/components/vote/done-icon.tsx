import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { FC } from "react";

export const DoneIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <CheckCircle strokeWidth={2} className={cn("text-pink-600", className)} />
  );
};
