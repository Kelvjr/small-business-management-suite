import { AppShell } from "@/components/layout/app-shell";
import { PageIntro } from "@/components/shared/page-intro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageIntro
          title="Reports"
          description="View business performance insights and summaries."
        />

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This page will hold revenue trends, category performance, and exportable reports.
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
