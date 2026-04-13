import { prisma } from "../lib/prisma";
import {
  CreateSaleSchemaType,
  UpdateSaleSchemaType,
} from "../validators/sales.validator";

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

export async function updateSale(id: string, data: UpdateSaleSchemaType) {
  return prisma.sale.update({
    where: { id },
    data: {
      ...(data.itemType !== undefined && { itemType: data.itemType }),
      ...(data.itemName !== undefined && { itemName: data.itemName }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.subcategory !== undefined && { subcategory: data.subcategory }),
      ...(data.quantity !== undefined && { quantity: data.quantity }),
      ...(data.unitPrice !== undefined && { unitPrice: data.unitPrice }),
      ...(data.totalAmount !== undefined && { totalAmount: data.totalAmount }),
      ...(data.paymentStatus !== undefined && {
        paymentStatus: data.paymentStatus,
      }),
      ...(data.salesChannel !== undefined && {
        salesChannel: data.salesChannel,
      }),
      ...(data.customerName !== undefined && {
        customerName: data.customerName,
      }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.soldAt !== undefined && {
        soldAt: data.soldAt ? new Date(data.soldAt) : undefined,
      }),
    },
  });
}

export async function deleteSale(id: string) {
  return prisma.sale.delete({
    where: { id },
  });
}