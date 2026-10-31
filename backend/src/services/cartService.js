const productService = require("./productService");

const carts = new Map();

function getCart(customerId = "guest") {
  if (!carts.has(customerId)) {
    carts.set(customerId, []);
  }

  return carts.get(customerId);
}

function getCartWithProducts(customerId) {
  return getCart(customerId).map((item) => ({
    ...item,
    product: productService.findProductById(item.productId)
  }));
}

function addItem(customerId, productId, quantity) {
  const product = productService.findProductById(productId);

  if (!product) {
    return { error: "Product not found" };
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: "Quantity must be a positive integer" };
  }

  const cart = getCart(customerId);
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  return { data: getCartWithProducts(customerId) };
}

function removeItem(customerId, productId) {
  const cart = getCart(customerId);
  const updatedCart = cart.filter((item) => item.productId !== productId);
  carts.set(customerId, updatedCart);

  return getCartWithProducts(customerId);
}

module.exports = {
  getCartWithProducts,
  addItem,
  removeItem
};
