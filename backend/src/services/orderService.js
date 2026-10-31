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

  const orderId = `o-${Date.now()}`;
  const order = {
    orderId,
    customerId,
    items: cartItems,
    status: "confirmed",
    reservationId: reservation.data.reservationId,
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
