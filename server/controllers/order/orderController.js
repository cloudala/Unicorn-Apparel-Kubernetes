const { addOrderQuery, deleteOrderQuery } = require('../../queries/order/orderQueries');
const { driver } = require('../../database/setup');

function addOrder(req, res) {
  const session = driver.session();
  const requestBody = req.body;
  const { query, parameters } = addOrderQuery(requestBody);

  session
  .executeWrite((transaction) => {
      return transaction.run(query, parameters);
  })
  .then((result) => {
      const orderId = result.records[0]?.get('order').properties.id;
      res.status(201).json({ message: 'Order created successfully', orderId });
  })
  .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
  })
  .finally(() => {
      session.close();
  });
}

function deleteOrder(req, res) {
    const session = driver.session();
    const orderId = req.params.orderId;
    const { query, parameters } = deleteOrderQuery(orderId);
  
    session
      .executeWrite((transaction) => {
        return transaction.run(query, parameters);
      })
      .then(() => {
        res.status(200).json({ message: 'Order deleted successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      })
      .finally(() => {
        session.close();
    });
}
  

module.exports = { addOrder, deleteOrder }