import { AppShell } from "@/components/layout/app-shell";
import { PageIntro } from "@/components/shared/page-intro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageIntro
          title="Customers"
          description="Manage customer records and purchase history."
        />

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This page will hold customer profiles, contact details, and linked sales.
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
