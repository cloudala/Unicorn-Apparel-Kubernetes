const { getProductsQuery, getProductDetailsQuery, addProductQuery, updateProductQuery, deleteProductQuery } = require('../../queries/products/productQueries');
const { driver } = require('../../database/setup');

async function getProducts (req, res) {
  const session = driver.session();
  const { query, parameters } = getProductsQuery(req.query)
  try {
    const result = await session.run(query, parameters);

    const products = result.records.map(record => {
      const averageRating = record.get('averageRating');
      return {
        id: record.get('p.id'),
        title: record.get('p.title'),
        imageUrl: record.get('p.imageUrl'),
        category: record.get('category'),
        price: parseFloat(record.get('price')),
        shortDescription: record.get('p.shortDescription'),
        count: record.get('count').toNumber(),
        averageRating: averageRating !== null ? parseFloat(averageRating) : null,
      };
    });

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    session.close();
  }
}

async function getProductDetails (req, res) {
    const session = driver.session();
    const productId = req.params.id;
    const { query, parameters } = getProductDetailsQuery(productId)
    try {
        const result = await session.run(query, parameters);
    
        const [record] = result.records;
    
        if (!record) {
            return res.status(404).json({ error: 'Product not found' });
        }
    
        const averageRating = record.get('averageRating');
        const product = {
            id: record.get('p.id'),
            title: record.get('p.title'),
            imageUrl: record.get('p.imageUrl'),
            category: record.get('category'),
            price: parseFloat(record.get('price')),
            shortDescription: record.get('p.shortDescription'),
            longDescription: record.get('p.longDescription'),
            count: record.get('count').toNumber(),
            averageRating: averageRating !== null ? parseFloat(averageRating) : null,
        };
    
        res.json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        session.close()
    }
}

function addProduct (req, res) {
    const session = driver.session();
    const productData = req.body;
    const { query, parameters } = addProductQuery(productData)
    session
        .executeWrite((transaction) => {
        return transaction.run(query, parameters);
        })
        .then((result) => {
        const createdProduct = result.records[0].get('product').properties;
        const productCategory = result.records[0].get('category').properties;

        res.status(201).json({ product: createdProduct, category: productCategory });
        })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
        })
        .finally(() => {
        session.close();
    });
}

async function updateProduct(req, res) {
    const session = driver.session();
    const productId = req.params.id;
    const productData = req.body;
  
    try {
        const { query, parameters } = updateProductQuery(productId, productData);
  
        const result = await session.run(query, parameters);
  
        if (result.records.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
  
        const updatedProduct = result.records[0].get('product').properties;
        const updatedCategory = result.records[0].get('category').properties;
  
        res.json({ product: updatedProduct, category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        session.close();
    }
}

function deleteProduct (req, res) {
    const session = driver.session();
    const productId = req.params.id;
    const { query, parameters } = deleteProductQuery(productId)
    session
      .executeWrite((transaction) => {
        return transaction.run(query, parameters);
      })
      .then((result) => {
        const deletedCategory = result.records[0]?.get('category')?.properties;
        if (deletedCategory) {
          res.status(200).json({ message: 'Product and category deleted successfully.' });
        } else {
          res.status(200).json({ message: 'Product deleted successfully.' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      })
      .finally(() => {
        session.close();
    });
}

module.exports = { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct };