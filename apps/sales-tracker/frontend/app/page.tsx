import Link from "next/link";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ExportActions } from "@/components/shared/export-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";
import { fetchSales, fetchSalesSummary } from "@/lib/api";
import { buildDashboardSignals } from "@/lib/domain/dashboard-signals";
import { formatCurrency } from "@/lib/format";

function formatDeltaPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  if (value > 0) return `+${value.toFixed(1)}%`;
  return `${value.toFixed(1)}%`;
}

function getDeltaToneClass(value: number) {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-muted-foreground";
}

export default async function HomePage() {
  const [summary, sales] = await Promise.all([
    fetchSalesSummary(),
    fetchSales(),
  ]);
  const signals = buildDashboardSignals(sales);

  const dashboardSummaryRows = [
    { metric: "total_revenue", value: Number(summary.totalRevenue) },
    { metric: "sales_today", value: Number(summary.salesToday) },
    { metric: "sales_this_week", value: Number(summary.salesThisWeek) },
    { metric: "sales_this_month", value: Number(summary.salesThisMonth) },
    { metric: "total_sales_count", value: Number(summary.totalSalesCount) },
    { metric: "today_sales_count", value: Number(summary.todaySalesCount) },
    { metric: "week_sales_count", value: Number(summary.weekSalesCount) },
    { metric: "month_sales_count", value: Number(summary.monthSalesCount) },
    { metric: "this_week_revenue", value: signals.thisWeekRevenue },
    { metric: "last_week_revenue", value: signals.lastWeekRevenue },
    { metric: "weekly_revenue_change_pct", value: signals.revenueDeltaPercent },
    { metric: "this_week_sales_count", value: signals.thisWeekSalesCount },
    { metric: "last_week_sales_count", value: signals.lastWeekSalesCount },
    { metric: "weekly_sales_change_pct", value: signals.countDeltaPercent },
  ];
  const recentSalesRows = sales.slice(0, 10).map((sale) => ({
    id: sale.id,
    itemName: sale.itemName,
    totalAmount: Number(sale.totalAmount),
    paymentStatus: sale.paymentStatus,
    customerName: sale.customerName ?? "",
    salesChannel: sale.salesChannel ?? "",
    soldAt: new Date(sale.soldAt).toISOString(),
  }));

  return (
    <AppShell>
      <div className="space-y-6">
        <StatsCards summary={summary} />

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="rounded-2xl xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Sales</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/sales">View all</Link>
              </Button>
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
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/?sale=new">Add a new sale</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/customers">View customers</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/reports">View reports</Link>
              </Button>
              <div className="space-y-2 border-t pt-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Export Dashboard Analytics
                </p>
                <ExportActions
                  rows={dashboardSummaryRows}
                  fileBaseName="dashboard-analytics"
                  pdfTitle="Dashboard Analytics"
                />
                <ExportActions
                  rows={recentSalesRows}
                  fileBaseName="dashboard-recent-sales"
                  pdfTitle="Dashboard Recent Sales"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Smart Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!signals.reminders.length ? (
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  No reminders right now. You are on track.
                </div>
              ) : (
                signals.reminders.map((reminder) => (
                  <div
                    key={reminder}
                    className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                  >
                    {reminder}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <CardTitle>Weekly Report (Auto)</CardTitle>
              <Badge variant={signals.isLowActivityAlert ? "destructive" : "secondary"}>
                {signals.isLowActivityAlert ? "Low Activity Alert" : "Stable"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">This Week vs Last Week</p>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">This Week Revenue</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(signals.thisWeekRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">Last Week Revenue</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(signals.lastWeekRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">Revenue Change</span>
                <span className={`text-sm ${getDeltaToneClass(signals.revenueDeltaPercent)}`}>
                  {formatDeltaPercent(signals.revenueDeltaPercent)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">Sales Count Change</span>
                <span className={`text-sm ${getDeltaToneClass(signals.countDeltaPercent)}`}>
                  {signals.thisWeekSalesCount} vs {signals.lastWeekSalesCount} (
                  {formatDeltaPercent(signals.countDeltaPercent)})
                </span>
              </div>
              {signals.isLowActivityAlert ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  Sales dropped 30% or more compared to last week.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
