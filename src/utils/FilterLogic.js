import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "../services/api";

export async function filterLogic(
  search,
  category,
  price,
  currentPage,
  itemsPerPage
) {
  const skip = (currentPage - 1) * itemsPerPage;

  
  if (search !== "") {
    const res = await searchProducts(search, itemsPerPage, skip);

    const products = res.data.products.filter(
      (item) => item.price <= price
    );

    return {
      products,
      totalProducts: products.length,
    };
  }

  
  if (category !== "all") {
    const res = await getProductsByCategory(category);

    const filtered = res.data.products.filter(
      (item) => item.price <= price
    );

    const start = skip;
    const end = start + itemsPerPage;

    return {
      products: filtered.slice(start, end),
      totalProducts: filtered.length,
    };
  }

  const res = await getProducts(itemsPerPage, skip);

  const products = res.data.products.filter(
    (item) => item.price <= price
  );

  return {
    products,
    totalProducts: res.data.total,
  };
}