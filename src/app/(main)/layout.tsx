import { TabNavigation } from "@/components/tab-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full h-full overflow-hidden">
      <TabNavigation />
      {children}
    </div>
  );
}
