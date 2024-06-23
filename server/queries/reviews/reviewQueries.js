function getProductReviewsQuery(productId) {
    const query = `
      MATCH (product:Product {id: $productId})<-[:REVIEWS]-(review:Review)
      RETURN review.id AS reviewId, review.rating, review.reviewerName, review.reviewBody`
    
    return {
      query,
      parameters: { productId }
    };
}
  
function addProductReviewQuery(productId, reviewData) {
    const query = `
      MATCH (product:Product {id: $productId})
      CREATE (review:Review {
        id: apoc.create.uuid(),
        rating: toInteger($rating),
        reviewerName: $reviewerName,
        reviewBody: $reviewBody
      })-[:REVIEWS]->(product)
      RETURN review.id AS reviewId, review.rating, review.reviewerName, review.reviewBody`
  
      const { rating, reviewerName, reviewBody } = reviewData
      return {
        query,
        parameters: { productId, rating, reviewerName, reviewBody }
      };
}
  
function deleteProductReviewQuery(productId, reviewId) {
    const query = `
      MATCH (product:Product {id: $productId})<-[r:REVIEWS]-(review:Review {id: $reviewId})
      DELETE review, r`
    
    return {
      query,
      parameters: { productId, reviewId }
    };
  }
  
function updateProductReviewQuery(reviewId, reviewData) {
    const setClauses = [];
    const { rating, reviewerName, reviewBody } = reviewData;
    if (rating) setClauses.push(`review.rating = toInteger($rating)`);
    if (reviewerName) setClauses.push(`review.reviewerName = $reviewerName`);
    if (reviewBody) setClauses.push(`review.reviewBody = $reviewBody`);
    const setReviewProperties = setClauses.length > 0 ? `SET ${setClauses.join(', ')}` : '';
  
    const query = `
        MATCH (review:Review {id: $reviewId})
        ${setReviewProperties}
        RETURN review.id AS reviewId, review.rating, review.reviewerName, review.reviewBody
    `;
  
    return {
        query,
        parameters: { reviewId, rating, reviewerName, reviewBody }
    };
}

module.exports = { getProductReviewsQuery, addProductReviewQuery, deleteProductReviewQuery, updateProductReviewQuery };