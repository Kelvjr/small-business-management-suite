import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <div className="flex-1 space-y-6 p-4 lg:p-6">
            <StatsCards />

            <div className="grid gap-6 xl:grid-cols-3">
              <Card className="rounded-2xl xl:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">
                    Sales table will go here.
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border p-4 text-sm">
                    Add a new sale
                  </div>
                  <div className="rounded-xl border p-4 text-sm">
                    View customers
                  </div>
                  <div className="rounded-xl border p-4 text-sm">
                    Export records
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
