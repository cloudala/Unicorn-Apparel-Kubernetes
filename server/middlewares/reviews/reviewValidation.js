const { param, body, validationResult } = require('express-validator');

const createReviewValidation = [
    body('rating')
      .isNumeric().withMessage('Rating must be a number')
      .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
      .notEmpty().withMessage('Rating is required'),
    body('reviewerName')
      .isString().withMessage('Name must be a string')
      .isLength({ min: 1 }).withMessage('Name has a minimal length of 1')
      .isLength({ max: 20 }).withMessage('Name has a max length of 20'),
    body('reviewBody').optional().isString().withMessage('Review body must be a string')
];
 
 const validateReviewId = (req, res, next) => {
    param('reviewId').isUUID().withMessage('Invalid UUID format for id')(req, res, next);
 };
 
const updateReviewValidation = [
    body('rating')
      .optional()
      .isNumeric().withMessage('Rating must be a number')
      .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('reviewerName')
      .optional()
      .isString().withMessage('Name must be a string')
      .isLength({ min: 1 }).withMessage('Name has a minimal length of 1')
      .isLength({ max: 20 }).withMessage('Name has a max length of 20'),
    body('reviewBody').optional().isString().withMessage('Review body must be a string')
];

module.exports = { createReviewValidation, validateReviewId, updateReviewValidation };