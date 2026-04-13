export type Sale = {
  id: string;
  itemName: string;
  itemType: "product" | "service";
  category?: string | null;
  subcategory?: string | null;
  customerName?: string | null;
  totalAmount: number | string;
  unitPrice?: number | string | null;
  quantity?: number | null;
  paymentStatus: "paid" | "partial" | "unpaid";
  salesChannel?:
    | "walk-in"
    | "whatsapp"
    | "instagram"
    | "phone"
    | "website"
    | null;
  notes?: string | null;
  soldAt: string;
};
