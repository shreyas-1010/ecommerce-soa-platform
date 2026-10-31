const payments = new Map();

function processPayment(orderId, amount) {
  if (!orderId || !Number.isFinite(amount) || amount <= 0) {
    return { error: "A valid order ID and positive amount are required" };
  }

  const paymentId = `pay-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const payment = {
    paymentId,
    orderId,
    amount,
    status: "simulated_success",
    createdAt: new Date().toISOString()
  };

  payments.set(paymentId, payment);

  return { data: payment };
}

function findPaymentById(paymentId) {
  return payments.get(paymentId);
}

module.exports = {
  processPayment,
  findPaymentById
};
