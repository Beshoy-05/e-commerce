import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export function getProducts(limit = 0) {
  return axios.get(`${BASE_URL}?limit=${limit}`);
}

export function searchProducts(search) {
  return axios.get(`${BASE_URL}/search?q=${search}`);
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