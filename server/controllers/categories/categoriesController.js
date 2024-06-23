const { getCategoriesQuery } = require('../../queries/categories/categoriesQueries');
const { driver } = require('../../database/setup');

function getCategories (req, res) {
    const session = driver.session();
    const query = getCategoriesQuery()
    session
      .run(query)
      .then((result) => {
        const nodes = result.records.map((record) => record.get('n').properties);
        res.json(nodes);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      })
      .finally(() => {
        session.close();
    });
}

module.exports = { getCategories };