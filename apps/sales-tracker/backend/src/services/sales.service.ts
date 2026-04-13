import { prisma } from "../lib/prisma";
import {
  CreateSaleSchemaType,
  UpdateSaleSchemaType,
} from "../validators/sales.validator";

type GetSalesFilters = {
  itemType?: string;
  category?: string;
  paymentStatus?: string;
  customerName?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export async function getAllSales(filters?: GetSalesFilters) {
  const where: any = {};

  if (filters?.itemType) {
    where.itemType = filters.itemType;
  }

  if (filters?.category) {
    where.category = filters.category;
  }

  if (filters?.paymentStatus) {
    where.paymentStatus = filters.paymentStatus;
  }

  if (filters?.customerName) {
    where.customerName = {
      contains: filters.customerName,
      mode: "insensitive",
    };
  }

  if (filters?.search) {
    where.OR = [
      {
        itemName: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        category: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        subcategory: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        customerName: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        notes: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (filters?.startDate || filters?.endDate) {
    where.soldAt = {};

    if (filters.startDate) {
      where.soldAt.gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      where.soldAt.lte = new Date(filters.endDate);
    }
  }

  return prisma.sale.findMany({
    where,
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

export async function getSalesSummary() {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(startOfWeek.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [allSales, todaySales, weekSales, monthSales] = await Promise.all([
    prisma.sale.findMany({
      select: { totalAmount: true },
    }),
    prisma.sale.findMany({
      where: {
        soldAt: {
          gte: startOfToday,
        },
      },
      select: { totalAmount: true },
    }),
    prisma.sale.findMany({
      where: {
        soldAt: {
          gte: startOfWeek,
        },
      },
      select: { totalAmount: true },
    }),
    prisma.sale.findMany({
      where: {
        soldAt: {
          gte: startOfMonth,
        },
      },
      select: { totalAmount: true },
    }),
  ]);

  const sumAmounts = (sales: { totalAmount: any }[]) =>
    sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0);

  return {
    totalRevenue: sumAmounts(allSales),
    salesToday: sumAmounts(todaySales),
    salesThisWeek: sumAmounts(weekSales),
    salesThisMonth: sumAmounts(monthSales),
    totalSalesCount: allSales.length,
    todaySalesCount: todaySales.length,
    weekSalesCount: weekSales.length,
    monthSalesCount: monthSales.length,
  };
}