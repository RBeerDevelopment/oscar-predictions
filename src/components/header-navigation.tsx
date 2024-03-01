"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const HeaderNavigation: FC = () => {
  const pathname = usePathname();

  const isDashboard = pathname.includes("dashboard");

  return (
    <div className="hidden md:flex flex-row gap-6 text-xl font-semibold">
      <Link
        href="/dashboard"
        className={`${isDashboard ? "text-pink-600" : ""} hover:underline`}
      >
        Overview
      </Link>
      <Link
        href="/vote"
        className={`${!isDashboard ? "text-pink-600" : ""} hover:underline`}
      >
        Predictions
      </Link>
    </div>
  );
};
