"use client";

import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function getPageMeta(pathname: string) {
  if (pathname === "/") {
    return {
      title: "Dashboard",
      description: "Overview of your sales activity",
    };
  }

  if (pathname.startsWith("/sales")) {
    return {
      title: "Sales",
      description: "Manage and track your sales records",
    };
  }

  if (pathname.startsWith("/customers")) {
    return {
      title: "Customers",
      description: "Manage customer records and relationships",
    };
  }

  if (pathname.startsWith("/reports")) {
    return {
      title: "Reports",
      description: "View business insights and performance",
    };
  }

  if (pathname.startsWith("/settings")) {
    return {
      title: "Settings",
      description: "Manage business and account preferences",
    };
  }

  return {
    title: "Sales Tracker",
    description: "Manage your business operations",
  };
}

export function Topbar() {
  const pathname = usePathname();
  const { title, description } = getPageMeta(pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search..."
          className="hidden w-64 md:flex"
        />
        <Button variant="outline">Quick Add</Button>
      </div>
    </header>
  );
}
