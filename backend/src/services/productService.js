const products = [
  {
    id: "p-1001",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    category: "Accessories",
    price: 799,
    stock: 25
  },
  {
    id: "p-1002",
    name: "Mechanical Keyboard",
    description: "Compact mechanical keyboard",
    category: "Accessories",
    price: 2499,
    stock: 12
  },
  {
    id: "p-1003",
    name: "USB-C Hub",
    description: "Seven-port USB-C hub",
    category: "Accessories",
    price: 1599,
    stock: 18
  }
];

function listProducts(searchTerm = "") {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return products;
  }

  return products.filter((product) =>
    `${product.name} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(query)
  );
}

function findProductById(productId) {
  return products.find((product) => product.id === productId);
}

module.exports = {
  listProducts,
  findProductById
};
