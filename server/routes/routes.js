const express = require('express');
const router = express.Router();
const productsRoutes = require('./products/productRoutes');
const reviewsRoutes = require('./reviews/reviewRoutes');
const deliveryRoutes = require('./delivery/deliveryRoutes')
const categoriesRoutes = require('./categories/categoriesRoutes')
const orderRoutes = require('./order/orderRoutes')

// Products
router.use(productsRoutes);

// Reviews
router.use(reviewsRoutes);

// Delivery
router.use(deliveryRoutes);

// Categories
router.use(categoriesRoutes);

// Orders
router.use(orderRoutes)

module.exports = router;