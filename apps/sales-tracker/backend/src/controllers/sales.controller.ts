import { Request, Response } from "express";
import { createSale, getAllSales } from "../services/sales.service";

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
    const {
      itemType,
      itemName,
      category,
      subcategory,
      quantity,
      unitPrice,
      totalAmount,
      paymentStatus,
      salesChannel,
      customerName,
      notes,
      soldAt,
    } = req.body;

    if (!itemType || !itemName || unitPrice == null || totalAmount == null) {
      return res.status(400).json({
        error: "itemType, itemName, unitPrice, and totalAmount are required",
      });
    }

    const sale = await createSale({
      itemType,
      itemName,
      category,
      subcategory,
      quantity,
      unitPrice: Number(unitPrice),
      totalAmount: Number(totalAmount),
      paymentStatus,
      salesChannel,
      customerName,
      notes,
      soldAt,
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: "Failed to create sale" });
  }
}