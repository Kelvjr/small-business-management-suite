import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { NewSaleSheet } from "@/components/sales/new-sale-sheet";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <NewSaleSheet hideTrigger />
          <div className="flex-1 p-4 lg:p-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
