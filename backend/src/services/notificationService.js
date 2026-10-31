const notifications = new Map();

function sendOrderConfirmation(order) {
  const notificationId = `ntf-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const notification = {
    notificationId,
    customerId: order.customerId,
    orderId: order.orderId,
    message: `Your order ${order.orderId} is confirmed.`,
    read: false,
    createdAt: new Date().toISOString()
  };

  const customerNotifications =
    notifications.get(order.customerId) || [];

  customerNotifications.unshift(notification);
  notifications.set(order.customerId, customerNotifications);

  return { data: notification };
}

function listNotifications(customerId) {
  return notifications.get(customerId) || [];
}

function markAsRead(customerId, notificationId) {
  const items = notifications.get(customerId) || [];
  const notification = items.find(
    (item) => item.notificationId === notificationId
  );

  if (!notification) {
    return undefined;
  }

  notification.read = true;
  return notification;
}

module.exports = {
  sendOrderConfirmation,
  listNotifications,
  markAsRead
};
