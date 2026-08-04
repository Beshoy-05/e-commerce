import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export function getProducts(limit, skip) {
  return axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
}

export function searchProducts(search, limit, skip) {
  return axios.get(
    `${BASE_URL}/search?q=${search}&limit=${limit}&skip=${skip}`
  );
}

export function getCategories() {
  return axios.get(`${BASE_URL}/categories`);
}

export function getProductsByCategory(category) {
  return axios.get(`${BASE_URL}/category/${category}`);
}

export function getProduct(id) {
  return axios.get(`${BASE_URL}/${id}`);
}