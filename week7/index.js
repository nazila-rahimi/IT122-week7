import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import AppleProduct from "./models/appleproducts.js"; // MongoDB Schema
import db from "./data.js"; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow JSON data parsing
app.use(express.static("public")); // Serve static files

// Set EJS as the view engine
app.set("views", "./week7/templates");  //  Correct path to EJS views
app.set("view engine", "ejs");  // Ensure EJS is set as the template engine


//  Serve the Home Page
app.get("/", async (req, res) => {
    try {
        const products = await AppleProduct.find();
        console.log("✅ Server-side products:", products); // Debugging

        res.render("home", { items: JSON.stringify(products) }); //  Pass items as JSON
    } catch (err) {
        console.error("❌ Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

//  API: Get all products
app.get("/api/items", async (req, res) => {
    try {
        const products = await AppleProduct.find();
        res.json(products);
    } catch (error) {
        console.error("❌ Error fetching items:", error);
        res.status(500).json({ error: "Error retrieving data" });
    }
});

//  API: Get a Single Item by ID
app.get("/api/items/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await AppleProduct.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("❌ Error fetching item:", error);
        res.status(500).json({ error: "Error retrieving item" });
    }
});

//  API: Add or Update an Item
app.post("/api/items", async (req, res) => {
    try {
        const { id, name, price, year } = req.body;

        if (!id || !name || !price) {
            return res.status(400).json({ error: "ID, name, and price are required." });
        }

        let existingProduct = await AppleProduct.findOne({ id });

        if (existingProduct) {
            // Update existing item
            await AppleProduct.updateOne({ id }, { name, price, year });
            console.log(`✅ Updated item: ${id}`);
            res.json({ id, name, price, year });
        } else {
            // Add new item
            const newItem = new AppleProduct({ id, name, price, year });
            await newItem.save();
            console.log(`✅ New item added: ${id}`);
            res.status(201).json(newItem);
        }
    } catch (error) {
        console.error("❌ Error saving item:", error);
        res.status(500).json({ error: "Error saving item" });
    }
});

// API: Delete an Item
app.delete("/api/items/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const result = await AppleProduct.deleteOne({ id: productId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        console.log(`✅ Deleted item: ${productId}`);
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting item:", error);
        res.status(500).json({ error: "Error deleting item" });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error("❌ Port 3000 is already in use. Use `pkill -f node` in Replit Shell to stop existing server.");
        process.exit(1);
    } else {
        console.error("❌ Server error:", err);
    }
});
