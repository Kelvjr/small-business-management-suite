const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export async function fetchSalesSummary() {
  const res = await fetch(`${API_URL}/sales/summary`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sales summary");
  }

  return res.json();
}

export async function fetchSales() {
  const res = await fetch(`${API_URL}/sales`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }

  return res.json();
}