function sortProducts(products, selectedSort) {
  const sortedProducts = [...products];

  sortedProducts.forEach((product) => {
    // Set a computed price for each product based on discount or regular price
    product.computedPrice =
      product.product_discount_price || product.product_price;
  });

  switch (selectedSort) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.computedPrice - b.computedPrice);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.computedPrice - a.computedPrice);
    default:
      return sortedProducts;
  }
}
