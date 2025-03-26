import mongoose from "mongoose";
const appleProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number }
});
const AppleProduct = mongoose.model("AppleProduct", appleProductSchema);
export default AppleProduct;
