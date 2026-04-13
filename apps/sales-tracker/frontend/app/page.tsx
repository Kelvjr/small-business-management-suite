import { RecentSales } from "@/components/dashboard/recent-sales";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchSales, fetchSalesSummary } from "@/lib/api";

export default async function HomePage() {
  const [summary, sales] = await Promise.all([
    fetchSalesSummary(),
    fetchSales(),
  ]);

  return (
    <AppShell>
      <div className="space-y-6">
        <StatsCards summary={summary} />

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="rounded-2xl xl:col-span-2">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSales sales={sales} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border p-4 text-sm">Add a new sale</div>
              <div className="rounded-xl border p-4 text-sm">View customers</div>
              <div className="rounded-xl border p-4 text-sm">Export records</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
