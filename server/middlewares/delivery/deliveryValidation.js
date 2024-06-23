const { body, param } = require('express-validator');
const { driver } = require('../../database/setup');

const validateDeliveryId = (req, res, next) => {
  param('deliveryId').isUUID().withMessage('Invalid UUID format for id')(req, res, next);
};

const deliveryValidation = [
    body('type').isString().withMessage('Type is required').notEmpty(),
    body('price')
        .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0')
        .notEmpty().withMessage('Price is required'),
];

const deliveryUpdateValidation = [
  body('type').optional().isString().withMessage('Type must be a string'),
  body('price')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Price must be a number greater than 0'),
];

module.exports = { validateDeliveryId, deliveryValidation, deliveryUpdateValidation }