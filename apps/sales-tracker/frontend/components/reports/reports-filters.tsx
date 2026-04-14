"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ReportsFiltersProps = {
  startDate?: string;
  endDate?: string;
};

export function ReportsFilters({
  startDate = "",
  endDate = "",
}: ReportsFiltersProps) {
  const router = useRouter();
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (start) params.set("startDate", start);
    if (end) params.set("endDate", end);

    router.push(`/reports${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleReset() {
    setStart("");
    setEnd("");
    router.push("/reports");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
    >
      <Input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <Input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <div className="flex gap-2 xl:col-span-2">
        <Button type="submit">Apply</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
