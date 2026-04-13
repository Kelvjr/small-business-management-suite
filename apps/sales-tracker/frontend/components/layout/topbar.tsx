import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your sales activity
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search sales..." className="hidden w-64 md:flex" />
        <Button>New Sale</Button>
      </div>
    </header>
  );
}
