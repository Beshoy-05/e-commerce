import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "../services/api";

export async function filterLogic(search, category, price) {
  let products = [];

if (search !== "") {
  const res = await searchProducts(search);
  products = res.data.products;
}
else if (category !== "all") {
  const res = await getProductsByCategory(category);
  products = res.data.products;
}
else {
  const res = await getProducts();
  products = res.data.products;
}

products = products.filter(
  (item) => item.price <= price
);

  return {
    products,
    totalProducts: products.length,
  };
}