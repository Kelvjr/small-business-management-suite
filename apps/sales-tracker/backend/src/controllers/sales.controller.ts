import { Request, Response } from "express";
import { createSale, getAllSales } from "../services/sales.service";
import { createSaleSchema } from "../validators/sales.validator";

export async function fetchSales(_req: Request, res: Response) {
  try {
    const sales = await getAllSales();
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
}

export async function addSale(req: Request, res: Response) {
  try {
    const parsed = createSaleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten(),
      });
    }

    const sale = await createSale(parsed.data);

    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: "Failed to create sale" });
  }
}