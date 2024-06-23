const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../middlewares/validation');
const { validateId, createProductValidation, updateProductValidation } = require('../../middlewares/products/productValidation');
const { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct } = require('../../controllers/products/productController');

router.get('/api/products', getProducts);
router.get('/api/products/:id', [validateId, handleValidationErrors], getProductDetails);
router.post('/api/products', [createProductValidation, handleValidationErrors], addProduct);
router.patch('/api/products/:id', [validateId, updateProductValidation, handleValidationErrors], updateProduct);
router.delete('/api/products/:id', [validateId, handleValidationErrors], deleteProduct);

module.exports = router;