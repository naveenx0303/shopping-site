const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/', getProducts);
router.post('/', auth, addProduct);

module.exports = router; 