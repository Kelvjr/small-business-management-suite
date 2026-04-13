import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewSaleSheet } from "./new-sale-sheet";
import { SalesFilters } from "./sales-filters";
import { SalesTable } from "./sales-table";

type Sale = {
  id: string;
  itemName: string;
  itemType: string;
  category?: string | null;
  subcategory?: string | null;
  customerName?: string | null;
  totalAmount: number | string;
  paymentStatus: string;
  soldAt: string;
};

type SalesPageContentProps = {
  sales: Sale[];
};

export function SalesPageContent({ sales }: SalesPageContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground">
            View, filter, and manage all sales records.
          </p>
        </div>

        <NewSaleSheet />
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesFilters />
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
