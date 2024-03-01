import { FC } from "react";

export const SectionHeader: FC<{
  title: string;
  subtitle: string;
  isReversed?: boolean;
}> = ({ title, subtitle, isReversed = false }) => {
  return (
    <div className={`space-y-4 ${isReversed ? "md:text-end" : ""}`}>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="max-w-[500px] text-gray-500 md:text-xl dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};
