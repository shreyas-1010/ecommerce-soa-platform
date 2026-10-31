const productService = require("./productService");

const reservations = new Map();

function checkStock(productId) {
  const product = productService.findProductById(productId);

  if (!product) {
    return { error: "Product not found" };
  }

  const reserved = [...reservations.values()]
    .filter((reservation) => reservation.productId === productId)
    .reduce((total, reservation) => total + reservation.quantity, 0);

  return {
    productId,
    available: product.stock - reserved
  };
}

function reserveStock(items) {
  const unavailable = [];

  for (const item of items) {
    const result = checkStock(item.productId);

    if (
      result.error ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      result.available < item.quantity
    ) {
      unavailable.push(item.productId);
    }
  }

  if (unavailable.length > 0) {
    return { error: "Insufficient stock", unavailable };
  }

  const reservationId = `r-${Date.now()}`;

  for (const item of items) {
    reservations.set(`${reservationId}-${item.productId}`, {
      reservationId,
      productId: item.productId,
      quantity: item.quantity
    });
  }

  return { data: { reservationId, items } };
}

function releaseReservation(reservationId) {
  for (const [key, reservation] of reservations.entries()) {
    if (reservation.reservationId === reservationId) {
      reservations.delete(key);
    }
  }

  return { released: true, reservationId };
}

module.exports = {
  checkStock,
  reserveStock,
  releaseReservation
};
