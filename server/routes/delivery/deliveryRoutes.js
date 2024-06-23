const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../middlewares/validation');
const { deliveryValidation, deliveryUpdateValidation, validateDeliveryId } = require('../../middlewares/delivery/deliveryValidation');
const { getDelivery, addDelivery, updateDelivery, deleteDelivery } = require('../../controllers/delivery/deliveryController');

router.get('/api/delivery', getDelivery)
router.post('/api/delivery', [deliveryValidation, handleValidationErrors], addDelivery);
router.patch('/api/delivery/:deliveryId', [validateDeliveryId, deliveryUpdateValidation, handleValidationErrors], updateDelivery);
router.delete('/api/delivery/:deliveryId', [validateDeliveryId, handleValidationErrors], deleteDelivery);

module.exports = router;