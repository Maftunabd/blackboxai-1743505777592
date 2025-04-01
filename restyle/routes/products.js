const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');

// Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    let query = 'SELECT * FROM products';
    const params = [];
    
    // Filter by category if provided
    if (req.query.category) {
      query += ' WHERE category = ?';
      params.push(req.query.category);
    }

    // Sorting
    if (req.query.sort === 'price_asc') {
      query += ' ORDER BY price ASC';
    } else if (req.query.sort === 'price_desc') {
      query += ' ORDER BY price DESC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [products] = await req.db.query(query, params);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const [products] = await req.db.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(products[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Get recommended products (protected route)
router.get('/recommended', authenticate, async (req, res) => {
  try {
    // Simple recommendation logic - could be enhanced
    const [products] = await req.db.query(
      'SELECT * FROM products ORDER BY RAND() LIMIT 4'
    );
    res.json(products);
  } catch (err) {
    console.error('Error fetching recommended products:', err);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

module.exports = router;