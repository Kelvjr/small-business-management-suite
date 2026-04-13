import { Router } from "express";
import {
  addSale,
  editSale,
  fetchSales,
  removeSale,
} from "../controllers/sales.controller";

const router = Router();

router.get("/", fetchSales);
router.post("/", addSale);
router.patch("/:id", editSale);
router.delete("/:id", removeSale);

export default router;