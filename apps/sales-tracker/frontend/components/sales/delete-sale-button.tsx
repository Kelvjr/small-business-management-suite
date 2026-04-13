"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSale } from "@/lib/api";

type DeleteSaleButtonProps = {
  id: string;
};

export function DeleteSaleButton({ id }: DeleteSaleButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sale?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteSale(id);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete sale");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="w-full text-left text-sm text-red-600 disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
