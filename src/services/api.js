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

export function addProduct(product) {
  return axios.post(`${BASE_URL}/add`, product);
}

export function updateProduct(id, product) {
  return axios.put(`${BASE_URL}/${id}`, product);
}

export function deleteProduct(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}