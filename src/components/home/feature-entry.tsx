import { FC, ReactElement, cloneElement } from "react";
import { Badge } from "../ui/badge";

export const FeatureEntry: FC<{
  title: string;
  description: string;
  icon: ReactElement;
  isComingSoon?: boolean;
}> = ({ title, description, icon, isComingSoon = false }) => {
  const headerIcon = cloneElement(icon, {
    className: "w-6 h-6 text-white ",
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-600">
          {headerIcon}
        </div>
        <p className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
          {title}
        </p>
        {isComingSoon ? (
          <Badge className="bg-gray-500">Coming Soon</Badge>
        ) : null}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};
