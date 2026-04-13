const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

type FetchSalesParams = {
  category?: string;
  paymentStatus?: string;
  search?: string;
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