import { AppShell } from "@/components/layout/app-shell";
import { PageIntro } from "@/components/shared/page-intro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageIntro
          title="Settings"
          description="App and business preferences."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Business Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-xl border p-4">
                Business name and profile settings will go here.
              </div>
              <div className="rounded-xl border p-4">
                Default currency and sales preferences will go here.
              </div>
              <div className="rounded-xl border p-4">
                Category management can live here later.
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-xl border p-4">
                Notifications and reminders will go here.
              </div>
              <div className="rounded-xl border p-4">
                User account and access settings will go here.
              </div>
              <div className="rounded-xl border p-4">
                Export and backup preferences will go here.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
