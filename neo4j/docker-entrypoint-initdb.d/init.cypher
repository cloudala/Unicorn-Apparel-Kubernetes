// Create Categories
CREATE (category1:Category {name: 'Electronics'})
CREATE (category2:Category {name: 'Books'})
CREATE (category3:Category {name: 'Clothing'})

// Create Products
CREATE (product1:Product {id: apoc.create.uuid(), title: 'Smartphone', imageUrl: 'http://example.com/smartphone.jpg', price: 699.99, shortDescription: 'A smart phone with many features.', longDescription: 'A detailed description of the smartphone.', count: 100, dateAdded: timestamp()})
CREATE (product2:Product {id: apoc.create.uuid(), title: 'Laptop', imageUrl: 'http://example.com/laptop.jpg', price: 1299.99, shortDescription: 'A high-end laptop.', longDescription: 'A detailed description of the laptop.', count: 50, dateAdded: timestamp()})
CREATE (product3:Product {id: apoc.create.uuid(), title: 'T-shirt', imageUrl: 'http://example.com/tshirt.jpg', price: 19.99, shortDescription: 'A comfortable t-shirt.', longDescription: 'A detailed description of the t-shirt.', count: 200, dateAdded: timestamp()})

// Create Relationships between Products and Categories
MATCH (product1:Product {title: 'Smartphone'}), (category1:Category {name: 'Electronics'})
CREATE (product1)-[:BELONGS_TO]->(category1)
MATCH (product2:Product {title: 'Laptop'}), (category1:Category {name: 'Electronics'})
CREATE (product2)-[:BELONGS_TO]->(category1)
MATCH (product3:Product {title: 'T-shirt'}), (category3:Category {name: 'Clothing'})
CREATE (product3)-[:BELONGS_TO]->(category3)

// Create Deliveries
CREATE (delivery1:Delivery {id: apoc.create.uuid(), type: 'Standard Shipping', price: 5.99})
CREATE (delivery2:Delivery {id: apoc.create.uuid(), type: 'Express Shipping', price: 15.99})

// Create Users
CREATE (user1:User {id: apoc.create.uuid(), name: 'John', surname: 'Doe', email: 'john.doe@example.com', phoneNumber: '1234567890'})
CREATE (user2:User {id: apoc.create.uuid(), name: 'Jane', surname: 'Smith', email: 'jane.smith@example.com', phoneNumber: '0987654321'})

// Create Addresses
CREATE (address1:Address {id: apoc.create.uuid(), street: '123 Main St', postalCode: '12345', city: 'Metropolis'})
CREATE (address2:Address {id: apoc.create.uuid(), street: '456 Elm St', postalCode: '54321', city: 'Gotham'})

// Create Relationships between Users and Addresses
MATCH (user1:User {email: 'john.doe@example.com'}), (address1:Address {street: '123 Main St'})
CREATE (user1)-[:HAS_ADDRESS]->(address1)
MATCH (user2:User {email: 'jane.smith@example.com'}), (address2:Address {street: '456 Elm St'})
CREATE (user2)-[:HAS_ADDRESS]->(address2)

// Create Orders
CREATE (order1:Order {id: apoc.create.uuid(), orderDate: timestamp()})
CREATE (order2:Order {id: apoc.create.uuid(), orderDate: timestamp()})

// Create Relationships between Users and Orders
MATCH (user1:User {email: 'john.doe@example.com'}), (order1:Order)
CREATE (user1)-[:PLACED_ORDER]->(order1)
MATCH (user2:User {email: 'jane.smith@example.com'}), (order2:Order)
CREATE (user2)-[:PLACED_ORDER]->(order2)

// Create Relationships between Orders and Products
MATCH (order1:Order), (product1:Product {title: 'Smartphone'})
CREATE (order1)-[:CONTAINS {quantity: 1}]->(product1)
MATCH (order2:Order), (product3:Product {title: 'T-shirt'})
CREATE (order2)-[:CONTAINS {quantity: 2}]->(product3)

// Create Relationships between Orders and Deliveries
MATCH (order1:Order), (delivery1:Delivery {type: 'Standard Shipping'})
CREATE (order1)-[:HAS_DELIVERY]->(delivery1)
MATCH (order2:Order), (delivery2:Delivery {type: 'Express Shipping'})
CREATE (order2)-[:HAS_DELIVERY]->(delivery2)

// Create Reviews
CREATE (review1:Review {id: apoc.create.uuid(), rating: 5, reviewerName: 'Alice', reviewBody: 'Great product!'})
CREATE (review2:Review {id: apoc.create.uuid(), rating: 4, reviewerName: 'Bob', reviewBody: 'Very good quality.'})

// Create Relationships between Products and Reviews
MATCH (product1:Product {title: 'Smartphone'}), (review1:Review {reviewerName: 'Alice'})
CREATE (review1)-[:REVIEWS]->(product1)
MATCH (product3:Product {title: 'T-shirt'}), (review2:Review {reviewerName: 'Bob'})
CREATE (review2)-[:REVIEWS]->(product3)