function getDeliveryQuery() {
    const query = 'MATCH (n:Delivery) RETURN n.id AS id, n.type AS type, n.price AS price'
  
    return query;
}

function addDeliveryQuery(deliveryData) {
    const query = `
        WITH $deliveryData AS data,
             apoc.create.uuid() AS deliveryId
        CREATE (delivery:Delivery)
        SET delivery.id = deliveryId,
            delivery.type = data.type,
            delivery.price = data.price
        RETURN delivery.id AS id, delivery.type AS type, delivery.price AS price
    `;

    return {
        query,
        parameters: { deliveryData }
    };
}

function updateDeliveryQuery(deliveryId, deliveryData) {
    const setClauses = [];

    Object.entries(deliveryData).forEach(([key, value]) => {
        setClauses.push(`d.${key} = $deliveryData.${key}`);
    });

    const query = `MATCH (d:Delivery {id: $deliveryId}) SET ${setClauses.join(',')} RETURN d`;

    return {
        query,
        parameters: {deliveryId, deliveryData}
    };
}

function deleteDeliveryQuery(deliveryId) {
    const query = 'MATCH (d:Delivery {id: $deliveryId}) DETACH DELETE d RETURN d';

    return {
        query,
        parameters: { deliveryId },
    };
}
  
module.exports = { getDeliveryQuery, addDeliveryQuery, updateDeliveryQuery, deleteDeliveryQuery };