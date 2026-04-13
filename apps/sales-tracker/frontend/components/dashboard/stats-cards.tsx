import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

type StatsCardsProps = {
  summary: {
    totalRevenue: number;
    salesToday: number;
    salesThisWeek: number;
    salesThisMonth: number;
    totalSalesCount: number;
    todaySalesCount: number;
    weekSalesCount: number;
    monthSalesCount: number;
  };
};

export function StatsCards({ summary }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(summary.totalRevenue),
      subtext: `${summary.totalSalesCount} sales`,
    },
    {
      title: "Sales Today",
      value: formatCurrency(summary.salesToday),
      subtext: `${summary.todaySalesCount} sales`,
    },
    {
      title: "This Week",
      value: formatCurrency(summary.salesThisWeek),
      subtext: `${summary.weekSalesCount} sales`,
    },
    {
      title: "This Month",
      value: formatCurrency(summary.salesThisMonth),
      subtext: `${summary.monthSalesCount} sales`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
