import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.sale.deleteMany();

  await prisma.sale.createMany({
    data: [
      {
        itemType: "product",
        itemName: "Chocolate Cake",
        category: "Bakery",
        subcategory: "Cakes",
        quantity: 1,
        unitPrice: 180,
        totalAmount: 180,
        paymentStatus: "paid",
        salesChannel: "whatsapp",
        customerName: "Ama Mensah",
        notes: "Birthday order",
        soldAt: new Date("2026-04-10T10:00:00Z"),
      },
      {
        itemType: "product",
        itemName: "Meat Pie",
        category: "Pastries",
        subcategory: "Savories",
        quantity: 6,
        unitPrice: 12,
        totalAmount: 72,
        paymentStatus: "paid",
        salesChannel: "walk-in",
        customerName: "Walk-in",
        notes: "",
        soldAt: new Date("2026-04-11T09:30:00Z"),
      },
      {
        itemType: "service",
        itemName: "Small Event Catering",
        category: "Catering",
        subcategory: "Events",
        quantity: 1,
        unitPrice: 1200,
        totalAmount: 1200,
        paymentStatus: "partial",
        salesChannel: "phone",
        customerName: "Kojo Asare",
        notes: "Deposit paid",
        soldAt: new Date("2026-04-08T14:00:00Z"),
      },
      {
        itemType: "product",
        itemName: "Vanilla Cupcakes",
        category: "Bakery",
        subcategory: "Cupcakes",
        quantity: 12,
        unitPrice: 10,
        totalAmount: 120,
        paymentStatus: "paid",
        salesChannel: "instagram",
        customerName: "Abena Owusu",
        notes: "",
        soldAt: new Date("2026-04-09T16:20:00Z"),
      },
      {
        itemType: "product",
        itemName: "Spring Rolls",
        category: "Pastries",
        subcategory: "Snacks",
        quantity: 20,
        unitPrice: 5,
        totalAmount: 100,
        paymentStatus: "unpaid",
        salesChannel: "whatsapp",
        customerName: "Yaw Boateng",
        notes: "To be paid on delivery",
        soldAt: new Date("2026-04-12T12:15:00Z"),
      },
      {
        itemType: "service",
        itemName: "Birthday Setup",
        category: "Decor",
        subcategory: "Events",
        quantity: 1,
        unitPrice: 850,
        totalAmount: 850,
        paymentStatus: "paid",
        salesChannel: "website",
        customerName: "Efua Sarpong",
        notes: "Indoor setup",
        soldAt: new Date("2026-04-05T11:00:00Z"),
      },
      {
        itemType: "product",
        itemName: "Chicken Pie",
        category: "Pastries",
        subcategory: "Savories",
        quantity: 10,
        unitPrice: 15,
        totalAmount: 150,
        paymentStatus: "partial",
        salesChannel: "walk-in",
        customerName: "Walk-in",
        notes: "Half paid",
        soldAt: new Date("2026-04-06T08:45:00Z"),
      },
      {
        itemType: "product",
        itemName: "Red Velvet Cake",
        category: "Bakery",
        subcategory: "Cakes",
        quantity: 1,
        unitPrice: 250,
        totalAmount: 250,
        paymentStatus: "paid",
        salesChannel: "instagram",
        customerName: "Ama Mensah",
        notes: "Repeat customer",
        soldAt: new Date("2026-04-13T09:10:00Z"),
      },
      {
        itemType: "service",
        itemName: "Corporate Lunch Tray",
        category: "Catering",
        subcategory: "Corporate",
        quantity: 1,
        unitPrice: 650,
        totalAmount: 650,
        paymentStatus: "paid",
        salesChannel: "phone",
        customerName: "Kofi Adu",
        notes: "Office order",
        soldAt: new Date("2026-04-07T13:30:00Z"),
      },
      {
        itemType: "product",
        itemName: "Sausage Rolls",
        category: "Pastries",
        subcategory: "Snacks",
        quantity: 15,
        unitPrice: 8,
        totalAmount: 120,
        paymentStatus: "unpaid",
        salesChannel: "whatsapp",
        customerName: "Akosua Annan",
        notes: "Awaiting payment",
        soldAt: new Date("2026-04-04T15:40:00Z"),
      },
    ],
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
