import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatSaleDate } from "@/lib/format";
import type { Sale } from "@/lib/api";
import { PaymentStatusBadge } from "@/components/sales/payment-status-badge";

type RecentSalesProps = {
  sales: Sale[];
};

export function RecentSales({ sales }: RecentSalesProps) {
  if (!sales.length) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
        No sales yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="px-3 py-3 font-medium">Item</th>
            <th className="px-3 py-3 font-medium">Type</th>
            <th className="px-3 py-3 font-medium">Customer</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Amount</th>
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium text-right">View</th>
          </tr>
        </thead>
        <tbody>
          {sales.slice(0, 8).map((sale) => (
            <tr key={sale.id} className="border-b last:border-0">
              <td className="px-3 py-3">
                <div className="font-medium">{sale.itemName}</div>
                <div className="text-xs text-muted-foreground">
                  {sale.category || "Uncategorized"}
                </div>
              </td>
              <td className="px-3 py-3 capitalize">{sale.itemType}</td>
              <td className="px-3 py-3">{sale.customerName || "Walk-in"}</td>
              <td className="px-3 py-3">
                <PaymentStatusBadge status={sale.paymentStatus} />
              </td>
              <td className="px-3 py-3 font-medium">
                {formatCurrency(Number(sale.totalAmount))}
              </td>
              <td className="px-3 py-3">{formatSaleDate(sale.soldAt)}</td>
              <td className="px-3 py-3 text-right">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/sales/${sale.id}`}>View</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
