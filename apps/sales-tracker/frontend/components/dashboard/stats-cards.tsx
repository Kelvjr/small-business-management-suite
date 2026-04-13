import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Revenue", value: "₵0.00" },
  { title: "Sales Today", value: "₵0.00" },
  { title: "This Week", value: "₵0.00" },
  { title: "This Month", value: "₵0.00" },
];

export function StatsCards() {
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
