const { getDeliveryQuery, addDeliveryQuery, updateDeliveryQuery, deleteDeliveryQuery } = require('../../queries/delivery/deliveryQueries');
const { driver } = require('../../database/setup');

async function getDelivery (req, res) {
    const session = driver.session();
    const query = getDeliveryQuery()
    try {
      const result = await session.run(query);
      const delivery = result.records.map(record => record.toObject());
      res.json({delivery});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } finally {
      session.close();
    }
}


async function addDelivery(req, res) {
  const session = driver.session();
  const deliveryData = req.body;
  const { query, parameters } = addDeliveryQuery(deliveryData);

  try {
      const result = await session.run(query, parameters);
      const createdDelivery = result.records[0].toObject();
      res.status(201).json({ delivery: createdDelivery });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  } finally {
      session.close();
  }
}

async function updateDelivery(req, res) {
  const session = driver.session();
  const deliveryId = req.params.deliveryId;
  const deliveryData = req.body;
  const {query, parameters} = updateDeliveryQuery(deliveryId, deliveryData)
  try {
      const result = await session.run(query, parameters);
      const deliveryExists = result.records.length > 0;

      if (!deliveryExists) {
          return res.status(404).json({ message: 'Delivery not found' });
      }

      res.json({ message: 'Delivery updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  } finally {
      session.close();
  }
}

async function deleteDelivery(req, res) {
  const session = driver.session();
  const deliveryId = req.params.deliveryId;
  const {query, parameters} = deleteDeliveryQuery(deliveryId)
  try {
      const result = await session.run(query, parameters);
      const deliveryExists = result.records.length > 0;

      if (!deliveryExists) {
          return res.status(404).json({ message: 'Delivery not found' });
      }

      res.json({ message: 'Delivery deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  } finally {
      session.close();
  }
}

module.exports = { getDelivery, addDelivery, updateDelivery, deleteDelivery };