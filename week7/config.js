export const MONGO_URI = "mongodb+srv://dbuser:Yosuf143@cluster0.cctfk.mongodb.net/sccproject?retryWrites=true&w=majority";

if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing! Please check config.js.");
    process.exit(1);
}
