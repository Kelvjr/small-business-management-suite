import { z } from "zod";

export const createSaleSchema = z.object({
  itemType: z.enum(["product", "service"]),
  itemName: z.string().trim().min(1, "Item name is required"),
  category: z.string().trim().optional(),
  subcategory: z.string().trim().optional(),
  quantity: z.number().int().positive().optional().default(1),
  unitPrice: z.number().positive("Unit price must be greater than 0"),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
  paymentStatus: z.enum(["paid", "partial", "unpaid"]).optional().default("paid"),
  salesChannel: z
    .enum(["walk-in", "whatsapp", "instagram", "phone", "website"])
    .optional(),
  customerName: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  soldAt: z.string().datetime().optional(),
});

export type CreateSaleSchemaType = z.infer<typeof createSaleSchema>;