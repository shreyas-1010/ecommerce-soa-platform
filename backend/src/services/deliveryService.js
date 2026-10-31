const deliveries = new Map();

function createDelivery(order) {
  const deliveryId = `del-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const delivery = {
    deliveryId,
    orderId: order.orderId,
    customerId: order.customerId,
    status: "preparing",
    trackingNumber: `DEMO-${deliveryId.toUpperCase()}`,
    createdAt: new Date().toISOString()
  };

  deliveries.set(order.orderId, delivery);

  return { data: delivery };
}

function findDeliveryByOrderId(orderId, customerId) {
  const delivery = deliveries.get(orderId);

  if (!delivery || delivery.customerId !== customerId) {
    return undefined;
  }

  return delivery;
}

module.exports = {
  createDelivery,
  findDeliveryByOrderId
};
