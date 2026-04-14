import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageIntro } from "@/components/shared/page-intro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSales } from "@/lib/api";
import { buildCustomersFromSales } from "@/lib/domain/customers";
import { formatCurrency } from "@/lib/format";

export default async function CustomersPage() {
  const sales = await fetchSales();
  const customers = buildCustomersFromSales(sales);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageIntro
          title="Customers"
          description="Customers derived from recorded sales."
        />

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {!customers.length ? (
              <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                No customer data yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="px-3 py-3 font-medium">Customer</th>
                      <th className="px-3 py-3 font-medium">Orders</th>
                      <th className="px-3 py-3 font-medium">Total Spent</th>
                      <th className="px-3 py-3 font-medium">Last Purchase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.name} className="border-b last:border-0">
                        <td className="px-3 py-3 font-medium">
                          <Link
                            href={`/customers/${customer.slug}`}
                            className="hover:underline"
                          >
                            {customer.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3">{customer.totalOrders}</td>
                        <td className="px-3 py-3">
                          {formatCurrency(customer.totalSpent)}
                        </td>
                        <td className="px-3 py-3">
                          {new Date(customer.lastPurchase).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
