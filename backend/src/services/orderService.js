const cartService = require("./cartService");
const inventoryService = require("./inventoryService");
const paymentService = require("./paymentService");

const orders = new Map();

function placeOrder(customerId) {
  const cartItems = cartService.getCartWithProducts(customerId);

  if (cartItems.length === 0) {
    return { error: "Cart is empty", status: 400 };
  }

  const items = cartItems.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    unitPrice: item.product.price,
    quantity: item.quantity,
    lineTotal: item.product.price * item.quantity
  }));

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);

  const reservation = inventoryService.reserveStock(
    items.map(({ productId, quantity }) => ({ productId, quantity }))
  );

  if (reservation.error) {
    return {
      error: reservation.error,
      unavailable: reservation.unavailable,
      status: 409
    };
  }

  const reservationId = reservation.data.reservationId;
  const paymentResult = paymentService.processPayment(
    `pending-${reservationId}`,
    total
  );

  if (paymentResult.error) {
    inventoryService.releaseReservation(reservationId);
    return { error: paymentResult.error, status: 400 };
  }

  const confirmation =
    inventoryService.confirmReservation(reservationId);

  if (confirmation.error) {
    inventoryService.releaseReservation(reservationId);
    return { error: confirmation.error, status: 409 };
  }

  const orderId = `o-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const order = {
    orderId,
    customerId,
    items,
    total,
    paymentId: paymentResult.data.paymentId,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  orders.set(orderId, order);

  return { data: order };
}

function listOrders(customerId) {
  return [...orders.values()].filter(
    (order) => order.customerId === customerId
  );
}

function findOrderById(customerId, orderId) {
  const order = orders.get(orderId);

  if (!order || order.customerId !== customerId) {
    return undefined;
  }

  return order;
}

module.exports = {
  placeOrder,
  listOrders,
  findOrderById
};
