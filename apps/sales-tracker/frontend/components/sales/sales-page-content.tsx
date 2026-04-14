import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Sale } from "@/lib/api";
import { ExportActions } from "@/components/shared/export-actions";
import { SalesFilters } from "./sales-filters";
import { SalesTable } from "./sales-table";

type SalesPageContentProps = {
  sales: Sale[];
};

export function SalesPageContent({ sales }: SalesPageContentProps) {
  const exportRows = sales.map((sale) => ({
    id: sale.id,
    itemType: sale.itemType,
    itemName: sale.itemName,
    category: sale.category ?? "",
    subcategory: sale.subcategory ?? "",
    quantity: sale.quantity ?? "",
    unitPrice: Number(sale.unitPrice ?? 0),
    totalAmount: Number(sale.totalAmount),
    paymentStatus: sale.paymentStatus,
    salesChannel: sale.salesChannel ?? "",
    customerName: sale.customerName ?? "",
    notes: sale.notes ?? "",
    soldAt: new Date(sale.soldAt).toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground">
            View, filter, and manage all sales records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ExportActions
            rows={exportRows}
            fileBaseName="sales-records"
            pdfTitle="Sales Records"
          />
          <Button asChild>
            <Link href="/sales?sale=new">New Sale</Link>
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-20 shrink-0" />
                </div>
              </div>
            }
          >
            <SalesFilters />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesTable sales={sales} />
        </CardContent>
      </Card>
    </div>
  );
}
