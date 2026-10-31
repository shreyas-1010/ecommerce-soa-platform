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
  if (!Array.isArray(items) || items.length === 0) {
    return { error: "At least one item is required", unavailable: [] };
  }

  const unavailable = [];

  for (const item of items) {
    if (!item || typeof item.productId !== "string") {
      unavailable.push(item?.productId || "unknown");
      continue;
    }

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

  const reservationId = `r-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  for (const item of items) {
    reservations.set(`${reservationId}-${item.productId}`, {
      reservationId,
      productId: item.productId,
      quantity: item.quantity
    });
  }

  return { data: { reservationId, items } };
}

function confirmReservation(reservationId) {
  const reservationEntries = [...reservations.entries()].filter(
    ([, reservation]) => reservation.reservationId === reservationId
  );

  if (reservationEntries.length === 0) {
    return { error: "Reservation not found" };
  }

  for (const [, reservation] of reservationEntries) {
    const product = productService.findProductById(reservation.productId);

    if (!product || product.stock < reservation.quantity) {
      return { error: `Unable to fulfill product ${reservation.productId}` };
    }
  }

  for (const [key, reservation] of reservationEntries) {
    const product = productService.findProductById(reservation.productId);
    product.stock -= reservation.quantity;
    reservations.delete(key);
  }

  return { data: { confirmed: true, reservationId } };
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
  confirmReservation,
  releaseReservation
};
