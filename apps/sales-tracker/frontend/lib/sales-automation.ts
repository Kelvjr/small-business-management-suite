import type { Sale } from "@/lib/api";

const FREQUENT_ITEMS_KEY = "sales_tracker.frequent_items";

export type FrequentItem = {
  itemType: "product" | "service";
  itemName: string;
  category?: string;
  subcategory?: string;
  unitPrice: number;
  paymentStatus: "paid" | "partial" | "unpaid";
  salesChannel: "walk-in" | "whatsapp" | "instagram" | "phone" | "website";
  customerName?: string;
  notes?: string;
  useCount: number;
  updatedAt: string;
};

type SaleDraft = {
  itemType: "product" | "service";
  itemName: string;
  category?: string;
  subcategory?: string;
  unitPrice: number;
  paymentStatus: "paid" | "partial" | "unpaid";
  salesChannel: "walk-in" | "whatsapp" | "instagram" | "phone" | "website";
  customerName?: string;
  notes?: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function sortFrequentItems(items: FrequentItem[]) {
  return [...items].sort((a, b) => {
    if (b.useCount !== a.useCount) {
      return b.useCount - a.useCount;
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function getNowDatetimeLocalValue() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export function readFrequentItems(): FrequentItem[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(FREQUENT_ITEMS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as FrequentItem[];
    if (!Array.isArray(parsed)) return [];
    return sortFrequentItems(parsed);
  } catch {
    return [];
  }
}

function writeFrequentItems(items: FrequentItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FREQUENT_ITEMS_KEY, JSON.stringify(items));
}

export function upsertFrequentItem(draft: SaleDraft) {
  if (!draft.itemName.trim() || !Number.isFinite(draft.unitPrice)) return [];

  const items = readFrequentItems();
  const nameKey = normalize(draft.itemName);
  const existing = items.find((item) => normalize(item.itemName) === nameKey);

  if (existing) {
    existing.itemType = draft.itemType;
    existing.category = draft.category;
    existing.subcategory = draft.subcategory;
    existing.unitPrice = draft.unitPrice;
    existing.paymentStatus = draft.paymentStatus;
    existing.salesChannel = draft.salesChannel;
    existing.customerName = draft.customerName;
    existing.notes = draft.notes;
    existing.useCount += 1;
    existing.updatedAt = new Date().toISOString();
    const sorted = sortFrequentItems(items);
    writeFrequentItems(sorted);
    return sorted;
  }

  const next: FrequentItem = {
    itemType: draft.itemType,
    itemName: draft.itemName.trim(),
    category: draft.category,
    subcategory: draft.subcategory,
    unitPrice: draft.unitPrice,
    paymentStatus: draft.paymentStatus,
    salesChannel: draft.salesChannel,
    customerName: draft.customerName,
    notes: draft.notes,
    useCount: 1,
    updatedAt: new Date().toISOString(),
  };

  const sorted = sortFrequentItems([next, ...items]).slice(0, 30);
  writeFrequentItems(sorted);
  return sorted;
}

export function findLastPrice(
  itemName: string,
  frequentItems: FrequentItem[],
  salesHistory: Sale[],
) {
  const normalized = normalize(itemName);
  if (!normalized) return null;

  const fromFrequent = frequentItems.find(
    (item) => normalize(item.itemName) === normalized,
  );
  if (fromFrequent) return fromFrequent.unitPrice;

  const fromSales = [...salesHistory]
    .filter((sale) => normalize(sale.itemName) === normalized)
    .sort((a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime())[0];

  if (!fromSales) return null;
  return Number(fromSales.unitPrice ?? fromSales.totalAmount);
}
