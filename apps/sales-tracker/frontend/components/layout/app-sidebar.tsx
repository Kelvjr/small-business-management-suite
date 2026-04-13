"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/layout/sidebar-context";

export function AppSidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={[
        "hidden border-r bg-background transition-all duration-200 lg:block",
        collapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-16 items-center border-b px-4",
          collapsed ? "justify-center" : "justify-between",
        ].join(" ")}
      >
        {!collapsed && (
          <div>
            <p className="text-lg font-semibold">Sales Tracker</p>
            <p className="text-xs text-muted-foreground">Smallbiz Suite</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      <SidebarNav />
    </aside>
  );
}
