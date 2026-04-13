import { AppShell } from "@/components/layout/app-shell";
import { PageIntro } from "@/components/shared/page-intro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageIntro
          title="Settings"
          description="Manage business preferences and account options."
        />

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This page will hold business info, currency preferences, categories, and user settings.
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
