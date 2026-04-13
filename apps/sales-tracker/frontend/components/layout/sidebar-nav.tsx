"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from "lucide-react";
import { useSidebar } from "@/components/layout/sidebar-context";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: Receipt },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SidebarNavProps = {
  onNavigate?: () => void;
};

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const iconOnly = collapsed && !onNavigate;

  return (
    <nav className="space-y-1 p-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className={[
              "flex items-center rounded-xl px-3 py-2 text-sm transition",
              iconOnly ? "justify-center" : "gap-3",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            ].join(" ")}
            title={iconOnly ? item.name : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!iconOnly && <span>{item.name}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
