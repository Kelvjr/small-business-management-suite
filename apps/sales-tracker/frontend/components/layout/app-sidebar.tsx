import { SidebarNav } from "@/components/layout/sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="hidden w-64 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <p className="text-lg font-semibold">Sales Tracker</p>
          <p className="text-xs text-muted-foreground">Smallbiz Suite</p>
        </div>
      </div>

      <SidebarNav />
    </aside>
  );
}
