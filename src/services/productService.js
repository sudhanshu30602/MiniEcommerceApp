import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.in/api';

export const fetchProducts = async () => {
  const response = await axios.get(`https://fakestoreapi.in/api/products?limit=50`);
  console.log("Product", response.data);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/category`);
  return response.data.categories;
 // console.log('yee hai', response.data.categories)
};
