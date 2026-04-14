"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

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

function TopbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { title, description } = getPageMeta(pathname);

  const params = new URLSearchParams(searchParams.toString());
  params.set("sale", "new");
  const quickAddHref = `${pathname}?${params.toString()}`;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-gradient-to-r from-primary/5 via-background to-accent/5 px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />

        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search..." className="hidden w-64 md:flex" />
        <Button asChild variant="outline" className="hidden border-primary/30 text-primary hover:bg-primary/10 sm:inline-flex">
          <Link href={quickAddHref}>Quick Add</Link>
        </Button>
      </div>
    </header>
  );
}

function TopbarFallback() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <div className="h-10 w-40 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="hidden h-9 w-28 animate-pulse rounded-md bg-muted sm:block" />
    </header>
  );
}

export function Topbar() {
  return (
    <Suspense fallback={<TopbarFallback />}>
      <TopbarContent />
    </Suspense>
  );
}
