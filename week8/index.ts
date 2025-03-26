import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Connect to MongoDB first
import db from "./data.js";

// Load Mongoose model
import AppleProduct from "./models/appleproducts.js";


// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Set up EJS templating
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");




// Render home page with all products
const renderHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await AppleProduct.find();
    res.render("home", { items: JSON.stringify(products) });
  } catch (err: any) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  }
};

// Get one item by ID
const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const product = await AppleProduct.findOne({ id: productId });

    if (!product) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(product);
    }
  } catch (error: any) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Error retrieving item" });
  }
};

// Get all items
const getAllItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await AppleProduct.find();
    res.json(products);
  } catch (error: any) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Error retrieving data" });
  }
};

// Add or update item
const postItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, price, year } = req.body;

    if (!id || !name || !price) {
      res.status(400).json({ error: "ID, name, and price are required." });
      return;
    }

    const existingProduct = await AppleProduct.findOne({ id });

    if (existingProduct) {
      await AppleProduct.updateOne({ id }, { name, price, year });
      res.json({ id, name, price, year });
    } else {
      const newItem = new AppleProduct({ id, name, price, year });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error: any) {
    console.error("Error saving item:", error);
    res.status(500).json({ error: "Error saving item" });
  }
};

// Delete item
const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const result = await AppleProduct.deleteOne({ id: productId });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  } catch (error: any) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Error deleting item" });
  }
};


app.get("/", renderHomePage);
app.get("/api/items/:id", getItemById);
app.get("/api/items", getAllItems);
app.post("/api/items", postItem);
app.delete("/api/items/:id", deleteItem);


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
}).on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error("Port 3000 is already in use. Use `pkill -f node` to stop the existing server.");
    process.exit(1);
  } else {
    console.error(" Server error:", err);
  }
});
