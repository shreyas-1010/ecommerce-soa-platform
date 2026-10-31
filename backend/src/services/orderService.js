const cartService = require("./cartService");
const inventoryService = require("./inventoryService");

const orders = new Map();

function placeOrder(customerId) {
  const cartItems = cartService.getCartWithProducts(customerId);

  if (cartItems.length === 0) {
    return { error: "Cart is empty", status: 400 };
  }

  const reservation = inventoryService.reserveStock(
    cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity
    }))
  );

  if (reservation.error) {
    return {
      error: reservation.error,
      unavailable: reservation.unavailable,
      status: 409
    };
  }

  const reservationId = reservation.data.reservationId;
  const confirmation =
    inventoryService.confirmReservation(reservationId);

  if (confirmation.error) {
    inventoryService.releaseReservation(reservationId);
    return {
      error: confirmation.error,
      status: 409
    };
  }

  const orderId = `o-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const order = {
    orderId,
    customerId,
    items: cartItems,
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
