"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SalesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [paymentStatus, setPaymentStatus] = useState(
    searchParams.get("paymentStatus") || "",
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (paymentStatus) params.set("paymentStatus", paymentStatus);

    router.push(`/sales${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleReset() {
    setSearch("");
    setCategory("");
    setPaymentStatus("");
    router.push("/sales");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
    >
      <Input
        placeholder="Search item, customer, notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Input
        placeholder="Payment status: paid / partial / unpaid"
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
      />

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Apply
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
