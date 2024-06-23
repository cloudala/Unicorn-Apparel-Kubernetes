function addOrderQuery(requestBody) {
  query = `
  // Generate UUIDs using APOC library
  WITH $requestBody AS data,
       apoc.create.uuid() AS userId,
       apoc.create.uuid() AS addressId,
       apoc.create.uuid() AS orderId
  
  // Create User node with UUID
  MERGE (user:User { email: data.email }) ON CREATE SET 
    user.id = userId,
    user.name = data.name,
    user.surname = data.surname,
    user.phoneNumber = data.phoneNumber
  ON MATCH SET 
    user.id = COALESCE(user.id, userId),
    user.name = COALESCE(user.name, data.name),
    user.surname = COALESCE(user.surname, data.surname),
    user.phoneNumber = COALESCE(user.phoneNumber, data.phoneNumber)

  // Create Address node with UUID and relationship with User
  MERGE (address:Address { street: data.street, postalCode: data.postalCode, city: data.city }) ON CREATE SET address.id = addressId
  ON MATCH SET address.id = COALESCE(address.id, addressId)

  MERGE (user)-[:HAS_ADDRESS]->(address)

  // Create Order node with UUID and relationship with User
  MERGE (order:Order { orderDate: timestamp() }) ON CREATE SET order.id = orderId
  ON MATCH SET order.id = COALESCE(order.id, orderId)

  MERGE (user)-[:PLACED_ORDER]->(order)

  // Create relationships between Order and products
  FOREACH (productData IN data.products |
    // Connect to existing Product node using product ID
    MERGE (product:Product { id: productData.id })
    
    // Create relationship with Order and set quantity property
    MERGE (order)-[contains:CONTAINS]->(product)
    SET contains.quantity = productData.quantity
    
    // Subtract the ordered quantity from the product count
    FOREACH (unused IN CASE WHEN product.count IS NOT NULL THEN [1] ELSE [] END |
      SET product.count = product.count - productData.quantity
    )
  )
  
  // Connect Order with Delivery
  MERGE (delivery:Delivery { type: data.delivery })
  MERGE (order)-[:HAS_DELIVERY]->(delivery)
  
  RETURN user, order;`

  return {
      query,
      parameters: { requestBody }
  };
}

function deleteOrderQuery(orderId) {
  const query = `
    MATCH (order:Order { id: $orderId })
    DETACH DELETE order
    RETURN true;
  `;

  return {
    query,
    parameters: { orderId },
  };
}

module.exports = { addOrderQuery, deleteOrderQuery };