const { buildBaseQuery, filterByCategory, filterByPriceRange, getSortingOrder } = require("../utils/queryUtils");

function getProductsQuery(queryParams) {
  const {
    category,
    minPrice,
    maxPrice,
    sortBy
  } = queryParams;

  let query = buildBaseQuery();
  
  if (category) {
    query += filterByCategory(category);
  }

  if (minPrice || maxPrice) {
    query += filterByPriceRange(category, minPrice, maxPrice);
  }

  query += `
    RETURN p.id, p.title, p.imageUrl, c.name AS category, toFloat(p.price) AS price, p.shortDescription, toInteger(p.count) AS count, averageRating
  `;

  if (sortBy) {
    query += getSortingOrder(sortBy);
  }

  return {
    query,
    parameters: {
      category,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
    }
  };
}

function getProductDetailsQuery(productId) {
    const query = `
      MATCH (p:Product {id: $productId})-[:BELONGS_TO]->(c:Category)
      OPTIONAL MATCH (p)<-[:REVIEWS]-(r:Review)
      WITH p, c, AVG(r.rating) AS averageRating
      RETURN p.id, p.title, p.imageUrl, c.name AS category, toFloat(p.price) AS price, p.shortDescription, p.longDescription, toInteger(p.count) AS count, averageRating
    `;

    return {
        query,
        parameters: { productId }
    };
}

function addProductQuery(productData) {
    const query = `
        WITH $productData AS productData
        // Create or retrieve the category node using APOC
        CALL apoc.merge.node(['Category'], {name: productData.category}, {})
        YIELD node AS category

        // Create the new product node using APOC
        CALL apoc.create.node(['Product'], {
          id: apoc.create.uuid(),
          title: productData.title,
          imageUrl: productData.imageUrl,
          price: productData.price,
          shortDescription: productData.shortDescription,
          longDescription: productData.longDescription,
          count: productData.count,
          dateAdded: timestamp()
        }) YIELD node AS product

        // Create BELONGS_TO relationship using APOC
        CALL apoc.create.relationship(product, 'BELONGS_TO', {}, category)
        YIELD rel

        RETURN product, category;
    `;

  return {
      query,
      parameters: { productData }
  };
}

function updateProductQuery(productId, productData) {
    const setClauses = [];
    const updateCategory = productData.category ? 'SET category.name = $category' : ''
  
    if (productData.title) setClauses.push(`product.title = $title`);
    if (productData.imageUrl) setClauses.push(`product.imageUrl = $imageUrl`);
    if (productData.price) setClauses.push(`product.price = $price`);
    if (productData.shortDescription) setClauses.push(`product.shortDescription = $shortDescription`);
    if (productData.longDescription) setClauses.push(`product.longDescription = $longDescription`);
    if (productData.count) setClauses.push(`product.count = $count`);
  
    const setProductProperties = setClauses.length > 0 ? `SET ${setClauses.join(', ')}` : '';
  
    const query = `
        MATCH (product:Product {id: $productId})-[:BELONGS_TO]->(category:Category)
        
        // Update product properties if provided in the request
        ${setProductProperties}
  
        // Optionally update category properties
        ${updateCategory}
  
        RETURN product, category;
    `.replace(/\s+$/gm, '');  // Remove trailing whitespace
  
    const parameters = {
        productId,
        title: productData.title,
        imageUrl: productData.imageUrl,
        price: productData.price,
        shortDescription: productData.shortDescription,
        longDescription: productData.longDescription,
        count: productData.count,
        category: productData.category
    };
  
    return { query, parameters };
}

function deleteProductQuery(productId) {
    const query = `
      MATCH (product:Product {id: $productId})-[:BELONGS_TO]->(category:Category)
      WITH product, category
      DETACH DELETE product
      WITH category
      WHERE NOT EXISTS(()-[:BELONGS_TO]->(category))
      DETACH DELETE category
      RETURN category;
    `;
  
    return {
      query,
      parameters: { productId }
    };
}

module.exports = { getProductsQuery, getProductDetailsQuery, addProductQuery, updateProductQuery, deleteProductQuery };