const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Dummy Data (In a real app, this would be in a database)
let brandRequests = [];
let brands = [
  { id: '1', name: 'Elite Sports', email: 'demo@athleteid.com', sign_in_code: 'demo123', created_at: new Date().toISOString() },
  { id: '2', name: 'Court Kings', email: 'brand@athleteid.com', sign_in_code: 'brand123', created_at: new Date().toISOString() },
];

let products = [
  {
    id: '1',
    brand_id: '1',
    name: 'Pro Football Cleats',
    description: 'Premium football cleats designed for professional athletes',
    price: 12999,
    category: 'Footwear',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

let orders = [
  {
    id: 'ORD-001',
    product_id: '1',
    buyer_id: 'user-1',
    buyer_name: 'Rajesh Kumar',
    status: 'delivered',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Athlete ID Brand Portal API is running' });
});

// Brand Requests
app.post('/api/brand-requests', (req, res) => {
  const newRequest = {
    id: Date.now().toString(),
    ...req.body,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  brandRequests.push(newRequest);
  res.status(201).json(newRequest);
});

app.get('/api/brand-requests', (req, res) => {
  res.json(brandRequests);
});

// Authentication (Simple Code-based)
app.post('/api/auth/signin', (req, res) => {
  const { email, code } = req.body;
  const brand = brands.find(b => b.email.toLowerCase() === email.toLowerCase() && b.sign_in_code === code);
  
  if (brand) {
    res.json({
      brandId: brand.id,
      brandName: brand.name,
      email: brand.email,
      isAuthenticated: true
    });
  } else {
    res.status(401).json({ message: 'Invalid email or sign-in code' });
  }
});

// Products
app.get('/api/products/:brandId', (req, res) => {
  const brandProducts = products.filter(p => p.brand_id === req.params.brandId);
  res.json(brandProducts);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Orders
app.get('/api/orders/:brandId', (req, res) => {
  // In a real app, we would join with products to filter by brand_id
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
