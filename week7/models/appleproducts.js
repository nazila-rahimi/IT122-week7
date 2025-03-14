import mongoose from "mongoose";

const { Schema } = mongoose;

const appleProductSchema = new Schema({
  id: Number, // Changed from String to Number
  name: { type: String, required: true },
  type: String,
  year: Number,
  price: Number
});

const AppleProduct = mongoose.model("appleproducts", appleProductSchema); // Ensure collection name matches

export default AppleProduct;
