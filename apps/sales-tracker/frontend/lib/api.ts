const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

type FetchSalesParams = {
  category?: string;
  paymentStatus?: string;
  search?: string;
};

export type CreateSalePayload = {
  itemType: "product" | "service";
  itemName: string;
  category?: string;
  subcategory?: string;
  quantity?: number;
  unitPrice: number;
  totalAmount: number;
  paymentStatus?: "paid" | "partial" | "unpaid";
  salesChannel?: "walk-in" | "whatsapp" | "instagram" | "phone" | "website";
  customerName?: string;
  notes?: string;
  soldAt?: string;
};

export async function fetchSalesSummary() {
  const res = await fetch(`${API_URL}/sales/summary`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sales summary");
  }

  return res.json();
}

export async function fetchSales(params?: FetchSalesParams) {
  const query = new URLSearchParams();

  if (params?.category) query.set("category", params.category);
  if (params?.paymentStatus) query.set("paymentStatus", params.paymentStatus);
  if (params?.search) query.set("search", params.search);

  const url = `${API_URL}/sales${query.toString() ? `?${query.toString()}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }

  return res.json();
}

export async function createSale(payload: CreateSalePayload) {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Failed to create sale";

    try {
      const errorData = await res.json();
      message = errorData?.error || message;
    } catch {}

    throw new Error(message);
  }

  return res.json();
}