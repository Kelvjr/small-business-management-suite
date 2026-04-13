import { prisma } from "../lib/prisma";
import { CreateSaleSchemaType } from "../validators/sales.validator";

export async function getAllSales() {
  return prisma.sale.findMany({
    orderBy: {
      soldAt: "desc",
    },
  });
}

export async function createSale(data: CreateSaleSchemaType) {
  return prisma.sale.create({
    data: {
      itemType: data.itemType,
      itemName: data.itemName,
      category: data.category,
      subcategory: data.subcategory,
      quantity: data.quantity ?? 1,
      unitPrice: data.unitPrice,
      totalAmount: data.totalAmount,
      paymentStatus: data.paymentStatus ?? "paid",
      salesChannel: data.salesChannel,
      customerName: data.customerName,
      notes: data.notes,
      soldAt: data.soldAt ? new Date(data.soldAt) : new Date(),
    },
  });
}