function buildBaseQuery() {
    return `
      MATCH (p:Product)-[:BELONGS_TO]->(c:Category)
      OPTIONAL MATCH (p)<-[:REVIEWS]-(r:Review)
      WITH p, c, AVG(r.rating) AS averageRating
    `;
  }
  
function filterByCategory(category) {
    return ` WHERE c.name = $category`;
}

function filterByPriceRange(category, minPrice, maxPrice) {
    let condition = category ? ' AND' : ' WHERE';
  
    if (minPrice && maxPrice) {
        condition += ' p.price >= $minPrice AND p.price <= $maxPrice';
    } else if (minPrice) {
        condition += ' p.price >= $minPrice';
    } else if (maxPrice) {
        condition += ' p.price <= $maxPrice';
    }

    return condition;
}

function getSortingOrder(sortBy) {
    switch (sortBy) {
        case 'priceLowToHigh':
            return ' ORDER BY toFloat(p.price) ASC';
        case 'priceHighToLow':
            return ' ORDER BY toFloat(p.price) DESC';
        case 'ratingLowToHigh':
            return ' ORDER BY toFloat(averageRating) ASC';
        case 'ratingHighToLow':
            return ' ORDER BY toFloat(averageRating) DESC';
        case 'dateOldestFirst':
            return ' ORDER BY p.dateAdded ASC';
        case 'dateNewestFirst':
            return ' ORDER BY p.dateAdded DESC';
        default:
            return '';
    }
}

module.exports = { buildBaseQuery, filterByCategory, filterByPriceRange, getSortingOrder }