import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import salesRoutes from "./routes/sales.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "Sales Tracker API is running" });
});

app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});