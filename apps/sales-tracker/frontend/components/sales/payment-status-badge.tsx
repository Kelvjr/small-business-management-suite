import { Badge } from "@/components/ui/badge";

type PaymentStatus = "paid" | "partial" | "unpaid";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const labels: Record<PaymentStatus, string> = {
  paid: "Paid",
  partial: "Partial",
  unpaid: "Unpaid",
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const variant =
    status === "paid"
      ? "default"
      : status === "partial"
        ? "secondary"
        : "destructive";

  return <Badge variant={variant}>{labels[status]}</Badge>;
}
