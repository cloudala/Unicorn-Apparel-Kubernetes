const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../middlewares/validation');
const { validateId } = require('../../middlewares/products/productValidation');
const { createReviewValidation, validateReviewId, updateReviewValidation } = require('../../middlewares/reviews/reviewValidation');
const { getProductReviews, addProductReview, updateProductReview, deleteProductReview } = require('../../controllers/reviews/reviewController');

router.get('/api/products/:id/reviews', [validateId, handleValidationErrors], getProductReviews);
router.post('/api/products/:id/reviews', [validateId, createReviewValidation, handleValidationErrors], addProductReview);
router.patch('/api/products/:id/reviews/:reviewId', [validateId, validateReviewId, updateReviewValidation, handleValidationErrors], updateProductReview);
router.delete('/api/products/:id/reviews/:reviewId', [validateId, validateReviewId, handleValidationErrors], deleteProductReview);

module.exports = router;