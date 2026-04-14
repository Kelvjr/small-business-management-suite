import type { Sale } from "@/lib/api";

export type CustomerRow = {
  name: string;
  slug: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchase: string;
};

export function slugifyCustomerName(name: string) {
  return encodeURIComponent(name.trim().toLowerCase());
}

export function normalizeCustomerSlug(slug: string) {
  return decodeURIComponent(slug).trim().toLowerCase();
}

export function getCustomerName(sale: Sale) {
  return sale.customerName?.trim() || "Walk-in";
}

export function buildCustomersFromSales(sales: Sale[]): CustomerRow[] {
  const grouped = new Map<string, CustomerRow>();

  for (const sale of sales) {
    const name = getCustomerName(sale);
    const slug = slugifyCustomerName(name);
    const existing = grouped.get(name);

    if (!existing) {
      grouped.set(name, {
        name,
        slug,
        totalOrders: 1,
        totalSpent: Number(sale.totalAmount),
        lastPurchase: sale.soldAt,
      });
      continue;
    }

    existing.totalOrders += 1;
    existing.totalSpent += Number(sale.totalAmount);

    if (new Date(sale.soldAt) > new Date(existing.lastPurchase)) {
      existing.lastPurchase = sale.soldAt;
    }
  }

  return Array.from(grouped.values()).sort((a, b) => b.totalSpent - a.totalSpent);
}

export function getCustomerSalesBySlug(sales: Sale[], slug: string) {
  const normalized = normalizeCustomerSlug(slug);

  return sales
    .filter((sale) => getCustomerName(sale).toLowerCase() === normalized)
    .sort(
      (a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime(),
    );
}
