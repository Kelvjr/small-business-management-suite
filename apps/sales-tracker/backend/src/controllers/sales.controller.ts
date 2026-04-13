import { Request, Response } from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  updateSale,
} from "../services/sales.service";
import {
  createSaleSchema,
  updateSaleSchema,
} from "../validators/sales.validator";

type SaleParams = {
  id: string;
};

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

export async function editSale(req: Request<SaleParams>, res: Response) {
  try {
    const { id } = req.params;

    const parsed = updateSaleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten(),
      });
    }

    const sale = await updateSale(id, parsed.data);

    res.json(sale);
  } catch (error: any) {
    console.error("Error updating sale:", error);

    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Sale not found" });
    }

    res.status(500).json({ error: "Failed to update sale" });
  }
}

export async function removeSale(req: Request<SaleParams>, res: Response) {
  try {
    const { id } = req.params;

    await deleteSale(id);

    res.json({ message: "Sale deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting sale:", error);

    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Sale not found" });
    }

    res.status(500).json({ error: "Failed to delete sale" });
  }
}