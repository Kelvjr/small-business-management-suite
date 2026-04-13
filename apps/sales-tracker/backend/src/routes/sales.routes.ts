import { Router } from "express";
import { addSale, fetchSales } from "../controllers/sales.controller";

const router = Router();

router.get("/", fetchSales);
router.post("/", addSale);

export default router;