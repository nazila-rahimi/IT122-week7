import express from "express";
import db from "./data.js"; //  MongoDB connection
import AppleProduct from "./models/appleproducts.js"; //  Product schema

const app = express();
const PORT = process.env.PORT || 3000; // Replit assigns a port

// Set EJS as the view engine
app.set("views", "templates"); 
app.set("view engine", "ejs");

app.use(express.static("public"));

//  Home Route: Get all products from MongoDB
app.get("/", async (req, res) => {
    try {
        const products = await AppleProduct.find(); //  Fetch all products
        res.render("home", { items: products });
    } catch (err) {
        console.error("⚠️ Error fetching products:", err);
        res.status(500).send("Error fetching products");
    }
});

//  Detail Route: Get a product by its `id` (Number)
app.get("/detail", async (req, res) => {
    try {
        const productId = parseInt(req.query.id); //  Convert id from URL string to a number
        console.log(`🔍 Searching for product with id: ${productId}`);
        const product = await AppleProduct.findOne({ id: productId }); // Match as a number

        if (product) {
            res.render("detail", { item: product });
        } else {
            console.log("❌ Product not found in MongoDB");
            res.status(404).send("Product not found");
        }
    } catch (err) {
        console.error("⚠️ Error fetching product:", err);
        res.status(500).send("Error fetching product");
    }
});

// Extra Credit: Delete a Product by `id` (Number)
app.get("/delete", async (req, res) => {
    try {
        const productId = parseInt(req.query.id); //  Convert id to Number
        console.log(`🗑️ Deleting product with id: ${productId}`);

        // Check if product exists BEFORE deleting
        const existingProduct = await AppleProduct.findOne({ id: productId });
        if (!existingProduct) {
            console.log("❌ Product not found in MongoDB");
            return res.status(404).send("Product not found");
        }

        // Proceed with deletion
        const deletedProduct = await AppleProduct.findOneAndDelete({ id: productId });
        console.log(`✅ Deleted product:`, deletedProduct);

        res.send(`✅ Product with id ${productId} deleted successfully`);
    } catch (err) {
        console.error("⚠️ Error deleting product:", err);
        res.status(500).send("Error deleting product");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error("❌ Port 3000 is already in use. Use `pkill -f node` in Replit Shell to stop existing server.");
        process.exit(1);
    } else {
        console.error("⚠️ Server error:", err);
    }
});
