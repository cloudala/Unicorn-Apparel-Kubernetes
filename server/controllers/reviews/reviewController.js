const { getProductReviewsQuery, addProductReviewQuery, updateProductReviewQuery, deleteProductReviewQuery } = require('../../queries/reviews/reviewQueries');
const { driver } = require('../../database/setup');

async function getProductReviews (req, res) {
    const session = driver.session();
    const productId = req.params.id;
    const { query, parameters } = getProductReviewsQuery(productId)
    try {
      const result = await session.run(query, parameters);
  
      const reviews = result.records.map(record => ({
        reviewId: record.get('reviewId'),
        rating: record.get('review.rating').toNumber(),
        reviewerName: record.get('review.reviewerName'),
        reviewBody: record.get('review.reviewBody'),
      }));
  
      res.json({ reviews });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } finally {
      session.close();
    }
}
  
async function addProductReview (req, res) {
    const session = driver.session();
    const productId = req.params.id;
    const reviewData = req.body;
    const {query, parameters} = addProductReviewQuery(productId, reviewData)
    try {
      const result = await session.run(query, parameters)
      const createdReview = result.records[0];
  
      if (!createdReview) {
        return res.status(404).json({ error: 'Failed to create review' });
      }
  
      const review = {
        reviewId: createdReview.get('reviewId'),
        rating: createdReview.get('review.rating').toNumber(),
        reviewerName: createdReview.get('review.reviewerName'),
        reviewBody: createdReview.get('review.reviewBody'),
      };
  
      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } finally {
      session.close();
    }
}

async function updateProductReview(req, res) {
    const session = driver.session();
    const reviewId = req.params.reviewId;
    const reviewData = req.body;
    const { query, parameters } = updateProductReviewQuery(reviewId, reviewData);
  
    try {
        const result = await session.run(query, parameters);
        const updatedReview = result.records[0];
  
        if (!updatedReview) {
            return res.status(404).json({ error: 'Failed to update review' });
        }
  
        const review = {
            reviewId: updatedReview.get('reviewId'),
            rating: updatedReview.get('review.rating').toNumber(),
            reviewerName: updatedReview.get('review.reviewerName'),
            reviewBody: updatedReview.get('review.reviewBody'),
        };
  
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        session.close();
    }
}  
  
async function deleteProductReview (req, res) {
    const session = driver.session();
    const productId = req.params.id;
    const reviewId = req.params.reviewId;
    const { query, parameters } = deleteProductReviewQuery(productId, reviewId)
    try {
      const result = await session.run(query, parameters);
  
      if (result.summary.counters.nodesDeleted === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.status(200).json({message: 'Review deleted successfully.'});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = { getProductReviews, addProductReview, updateProductReview, deleteProductReview };