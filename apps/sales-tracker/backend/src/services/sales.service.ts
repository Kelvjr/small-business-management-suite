import { prisma } from "../lib/prisma";

type CreateSaleInput = {
  itemType: string;
  itemName: string;
  category?: string;
  subcategory?: string;
  quantity?: number;
  unitPrice: number;
  totalAmount: number;
  paymentStatus?: string;
  salesChannel?: string;
  customerName?: string;
  notes?: string;
  soldAt?: string;
};

export async function getAllSales() {
  return prisma.sale.findMany({
    orderBy: {
      soldAt: "desc",
    },
  });
}

export async function createSale(data: CreateSaleInput) {
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