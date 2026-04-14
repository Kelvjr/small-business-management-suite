"use client";

import { MoreHorizontal } from "lucide-react";
import type { Sale } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteSaleButton } from "./delete-sale-button";
import { EditSaleSheet } from "./edit-sale-sheet";

type SaleRowActionsProps = {
  sale: Sale;
};

export function SaleRowActions({ sale }: SaleRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Row actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <EditSaleSheet sale={sale} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteSaleButton id={sale.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
