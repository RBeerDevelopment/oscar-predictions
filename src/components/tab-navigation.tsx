"use client";

import { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabNavigation: FC = () => {
  const pathname = usePathname();

  const currentTab = pathname.includes("dashboard") ? "dashboard" : "vote";

  return (
    <Tabs className="md:hidden" value={currentTab}>
      <TabsList className="w-full md:w-64 bg-white pt-2 mb-auto text-lg">
        <TabsTrigger value="dashboard" asChild>
          <Link className="w-1/2 py-4 text-center" href="/dashboard">
            Overview
          </Link>
        </TabsTrigger>
        <TabsTrigger value="vote" asChild>
          <Link className="w-1/2 py-4 text-center" href="/vote">
            Predictions
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
