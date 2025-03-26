import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://dbuser:Yosuf143@cluster0.cctfk.mongodb.net/sccproject?retryWrites=true&w=majority";

console.log("🔌 Connecting to MongoDB from data.ts...");

mongoose
  .connect(MONGO_URI, { dbName: "sccproject" } as mongoose.ConnectOptions)
  .then(() => {
    console.log("✅ Connected to MongoDB in data.ts");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed in data.ts:", err.message);
    process.exit(1);
  });

export default mongoose.connection;
