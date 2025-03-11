import mongoose from "mongoose";
import { MONGO_URI } from "./config.js"; // Import credentials securely

// Connect to MongoDB without deprecated options
mongoose.connect(MONGO_URI, {
    dbName: "sccproject"
});

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB Atlas (sccproject)");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});

export default mongoose;
