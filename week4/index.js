import express from 'express';
import cors from 'cors';
import AppleProduct from './models/appleproducts.js';
import './data.js'; // Connect to MongoDB

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Allows parsing of JSON in requests

//  KEEP OLD ROUTES 
app.get('/', (req, res) => {
  res.send('Welcome to the IT122 API!'); // Old route
});

app.get('/about', (req, res) => {
  res.send('This is the About page'); // Old route
});

// NEW ROUTE: GET ALL APPLE PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await AppleProduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
});

//  NEW ROUTE: GET A SINGLE APPLE PRODUCT BY ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await AppleProduct.findOne({ id: Number(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
});

//  NEW ROUTE: ADD OR UPDATE AN APPLE PRODUCT 
app.post('/api/products', async (req, res) => {
  try {
    const { id, name, price, year } = req.body; // Updated to use 'year' instead of 'description'

    if (id === undefined || name === undefined || price === undefined || year === undefined) {
      return res.status(400).json({ message: 'Missing required fields. Ensure id, name, price, and year are included.' });
    }

    const newProduct = { id, name, price, year };
    const result = await AppleProduct.updateOne({ id: newProduct.id }, newProduct, { upsert: true });

    res.json({ message: 'Product added or updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding or updating product', error });
  }
});

//  NEW ROUTE: DELETE AN APPLE PRODUCT
app.delete('/api/products/:id', async (req, res) => {
  try {
    const result = await AppleProduct.deleteOne({ id: Number(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
