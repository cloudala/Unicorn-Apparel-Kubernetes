const { param, body } = require('express-validator');

const validateId = (req, res, next) => {
    param('id').isUUID().withMessage('Invalid UUID format for id')(req, res, next);
 };
 
 const createProductValidation = [
     body('title').isString().notEmpty().withMessage('Title is required'),
     body('imageUrl').isURL().withMessage('Invalid URL format').notEmpty().withMessage('Image URL is required'),
     body('category').isString().notEmpty().withMessage('Category is required'),
     body('price').isNumeric().notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
     body('count').isNumeric().notEmpty().withMessage('Count is required').isInt({ min: 0 }).withMessage('Count must be at least 0'),
     body('shortDescription').isString().notEmpty().withMessage('Short Description is required'),
     body('longDescription').isString().notEmpty().withMessage('Long Description is required'),
 ];
 
 const updateProductValidation = [
    body('title').optional().isString(),
    body('imageUrl').optional().isURL().withMessage('Invalid URL format'),
    body('category').optional().isString().notEmpty(),
    body('price').optional().isNumeric().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('count').optional().isNumeric().notEmpty().isInt({ min: 0 }).withMessage('Count must be at least 0'),
    body('shortDescription').optional().isString(),
    body('longDescription').optional().isString().notEmpty()
];

module.exports = { validateId, createProductValidation, updateProductValidation };