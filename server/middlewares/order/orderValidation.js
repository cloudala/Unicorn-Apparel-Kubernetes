const { body, param } = require('express-validator');
const { driver } = require('../../database/setup');

const orderValidation = [
    body('name').isString().withMessage('Name is required').notEmpty(),
    body('surname').isString().withMessage('Surname is required').notEmpty(),
    body('email').isEmail().withMessage('Invalid email address').notEmpty(),
    body('phoneNumber').matches(/^(\+48)?[0-9]{9}$/).withMessage('Invalid phone number').notEmpty(),
    body('street').isString().withMessage('Street is required').notEmpty(),
    body('postalCode').matches(/^\d{2}-\d{3}$/).withMessage('Invalid postal code').notEmpty(),
    body('city').isString().withMessage('City is required').notEmpty(),
    body('delivery').custom(async (value) => {
        const session = driver.session();
    
        try {
          // Fetch valid delivery options from Neo4j
          const result = await session.run('MATCH (d:Delivery) RETURN d.type AS type');
          const validDeliveryOptions = result.records.map((record) => record.get('type'));
    
          // Check if the provided delivery option is valid
          if (!validDeliveryOptions.includes(value)) {
            return Promise.reject('Invalid delivery option');
          }
    
          return true;
        } finally {
          session.close();
        }
    }).notEmpty(),
    body('terms').isBoolean().withMessage('You must agree to the terms of service').notEmpty(),
    body('products').isArray().withMessage('Products must be an array').notEmpty(),
    body('products.*.id')
    .isUUID()
    .withMessage('Invalid UUID format')
    .custom(async (value, { req }) => {
      const session = driver.session();

      try {
        // Check if the product with the given ID exists in the database
        const result = await session.run('MATCH (p:Product {id: $productId}) RETURN p', { productId: value });
        const productExists = result.records.length > 0;

        if (!productExists) {
          throw new Error('Product with the given ID does not exist');
        }

        return true;
      } finally {
        session.close();
      }
    }),
    body('products.*.quantity')
    .custom(async (value, { req }) => {
      const session = driver.session();
  
      try {
        // Check if the quantity of the ordered product is available in the database
        for (const productData of req.body.products) {
          const productId = productData.id;
          
          if (!productId) {
            return Promise.reject('Product ID is missing');
          }
  
          const result = await session.run('MATCH (p:Product {id: $productId}) WHERE p.count >= $quantity RETURN p', {
            productId,
            quantity: value,
          });
  
          const productAvailable = result.records.length > 0;
  
          if (!productAvailable) {
            return Promise.reject(`Insufficient quantity of the ordered product with ID: ${productId}`);
          }
        }
  
        return true;
      } finally {
        session.close();
      }
    })
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const validateOrderId = (req, res, next) => {
  param('orderId').isUUID().withMessage('Invalid UUID format for id')(req, res, next);
};

module.exports = { orderValidation, validateOrderId }