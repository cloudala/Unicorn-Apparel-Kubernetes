const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../middlewares/validation');
const { orderValidation, validateOrderId } = require('../../middlewares/order/orderValidation');
const { addOrder, deleteOrder } = require('../../controllers/order/orderController');

router.post('/api/order', [orderValidation, handleValidationErrors], addOrder)
router.delete('/api/order/:orderId', [validateOrderId, handleValidationErrors], deleteOrder);

module.exports = router