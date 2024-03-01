import { FC, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const DashboardCard: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <Card className="overflow-y-hidden h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="md:p-6 p-2 h-[calc(70vh)] overflow-hidden">
        {children}
      </CardContent>
    </Card>
  );
};
