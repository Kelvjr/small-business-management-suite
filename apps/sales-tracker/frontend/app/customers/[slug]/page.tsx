import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { PageIntro } from "@/components/shared/page-intro";
import { PaymentStatusBadge } from "@/components/sales/payment-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSales } from "@/lib/api";
import { getCustomerName, getCustomerSalesBySlug } from "@/lib/domain/customers";
import { sumRevenue } from "@/lib/domain/sales-analytics";
import { formatCurrency } from "@/lib/format";

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sales = await fetchSales();
  const customerSales = getCustomerSalesBySlug(sales, slug);

  if (!customerSales.length) {
    notFound();
  }

  const customerName = getCustomerName(customerSales[0]);
  const totalOrders = customerSales.length;
  const totalSpent = sumRevenue(customerSales);
  const lastPurchase = customerSales[0].soldAt;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <PageIntro
            title={customerName}
            description="Customer details and sales history."
          />

          <Button asChild variant="outline">
            <Link href="/customers">Back to Customers</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard title="Total Orders" value={String(totalOrders)} />
          <StatCard title="Total Spent" value={formatCurrency(totalSpent)} />
          <StatCard
            title="Last Purchase"
            value={new Date(lastPurchase).toLocaleDateString()}
          />
        </div>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-3 py-3 font-medium">Item</th>
                    <th className="px-3 py-3 font-medium">Category</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">Amount</th>
                    <th className="px-3 py-3 font-medium">Date</th>
                    <th className="px-3 py-3 font-medium text-right">View</th>
                  </tr>
                </thead>
                <tbody>
                  {customerSales.map((sale) => (
                    <tr key={sale.id} className="border-b last:border-0">
                      <td className="px-3 py-3 font-medium">{sale.itemName}</td>
                      <td className="px-3 py-3">{sale.category || "—"}</td>
                      <td className="px-3 py-3">
                        <PaymentStatusBadge status={sale.paymentStatus} />
                      </td>
                      <td className="px-3 py-3">
                        {formatCurrency(Number(sale.totalAmount))}
                      </td>
                      <td className="px-3 py-3">
                        {new Date(sale.soldAt).toLocaleDateString()}
                      </td>
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
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
