import type { Sale } from "@/lib/api";

export function sumRevenue(sales: Sale[]) {
  return sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0);
}

export function filterSalesByDateRange(
  sales: Sale[],
  startDate?: string,
  endDate?: string,
) {
  return sales.filter((sale) => {
    const soldAt = new Date(sale.soldAt).getTime();

    if (startDate) {
      const start = new Date(startDate).getTime();
      if (soldAt < start) return false;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (soldAt > end.getTime()) return false;
    }

    return true;
  });
}

export function buildCategoryBreakdown(sales: Sale[]) {
  const grouped = new Map<string, number>();

  for (const sale of sales) {
    const category = sale.category?.trim() || "Uncategorized";
    grouped.set(
      category,
      (grouped.get(category) || 0) + Number(sale.totalAmount),
    );
  }

  return Array.from(grouped.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export function buildChannelBreakdown(sales: Sale[]) {
  const grouped = new Map<string, number>();

  for (const sale of sales) {
    const channel = sale.salesChannel?.trim() || "Unknown";
    grouped.set(channel, (grouped.get(channel) || 0) + Number(sale.totalAmount));
  }

  return Array.from(grouped.entries())
    .map(([channel, total]) => ({ channel, total }))
    .sort((a, b) => b.total - a.total);
}

export function buildStatusBreakdown(sales: Sale[]) {
  const grouped = new Map<string, number>();

  for (const sale of sales) {
    const status = sale.paymentStatus?.trim() || "unknown";
    grouped.set(status, (grouped.get(status) || 0) + Number(sale.totalAmount));
  }

  return Array.from(grouped.entries())
    .map(([status, total]) => ({ status, total }))
    .sort((a, b) => b.total - a.total);
}

export function buildTopCustomers(sales: Sale[]) {
  const grouped = new Map<string, number>();

  for (const sale of sales) {
    const customer = sale.customerName?.trim() || "Walk-in";
    grouped.set(customer, (grouped.get(customer) || 0) + Number(sale.totalAmount));
  }

  return Array.from(grouped.entries())
    .map(([customer, total]) => ({ customer, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

export function buildTopItems(sales: Sale[]) {
  const grouped = new Map<string, { count: number; total: number }>();

  for (const sale of sales) {
    const key = sale.itemName?.trim() || "Unnamed Item";
    const quantity = Number(sale.quantity ?? 1);

    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        count: quantity,
        total: Number(sale.totalAmount),
      });
      continue;
    }

    existing.count += quantity;
    existing.total += Number(sale.totalAmount);
  }

  return Array.from(grouped.entries())
    .map(([item, values]) => ({
      item,
      count: values.count,
      total: values.total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

export function buildProductInsights(sales: Sale[]) {
  const grouped = new Map<string, { revenue: number; salesCount: number }>();

  for (const sale of sales) {
    const itemName = sale.itemName?.trim() || "Unnamed Item";
    const existing = grouped.get(itemName);

    if (!existing) {
      grouped.set(itemName, {
        revenue: Number(sale.totalAmount),
        salesCount: 1,
      });
      continue;
    }

    existing.revenue += Number(sale.totalAmount);
    existing.salesCount += 1;
  }

  return Array.from(grouped.entries())
    .map(([itemName, value]) => ({
      itemName,
      revenue: value.revenue,
      salesCount: value.salesCount,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

function getDayRange(target = new Date()) {
  const start = new Date(target);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

function filterSalesByRange(sales: Sale[], start: Date, end: Date) {
  const startMs = start.getTime();
  const endMs = end.getTime();

  return sales.filter((sale) => {
    const soldAt = new Date(sale.soldAt).getTime();
    return soldAt >= startMs && soldAt < endMs;
  });
}

export function buildTodayVsYesterday(sales: Sale[]) {
  const todayRange = getDayRange();
  const yesterdayRange = getDayRange(
    new Date(todayRange.start.getTime() - 24 * 60 * 60 * 1000),
  );

  const todaySales = filterSalesByRange(sales, todayRange.start, todayRange.end);
  const yesterdaySales = filterSalesByRange(
    sales,
    yesterdayRange.start,
    yesterdayRange.end,
  );

  const todayCount = todaySales.length;
  const yesterdayCount = yesterdaySales.length;
  const todayRevenue = sumRevenue(todaySales);
  const yesterdayRevenue = sumRevenue(yesterdaySales);

  return {
    todayCount,
    yesterdayCount,
    todayRevenue,
    yesterdayRevenue,
    countDelta: todayCount - yesterdayCount,
    revenueDelta: todayRevenue - yesterdayRevenue,
  };
}
