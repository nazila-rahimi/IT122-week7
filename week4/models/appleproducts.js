import mongoose from '../data.js';

const appleProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String
});

const AppleProduct = mongoose.model('AppleProduct', appleProductSchema);
export default AppleProduct;
