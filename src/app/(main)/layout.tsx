import { MainHeader } from "@/components/main-header";
import { TabNavigation } from "@/components/tab-navigation";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <div className="flex flex-col gap-2 w-full h-full overflow-hidden">
        <MainHeader />
        <TabNavigation />
        {children}
        <Toaster />
      </div>
    </ClerkProvider>
  );
}
