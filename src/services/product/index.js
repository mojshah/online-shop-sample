import axios from "axios";

// const SERVER_URL = "http://localhost:9000";
const SERVER_URL = "https://online-shope-api.mojshah.ir";

function makeConfig() {
  return {
    baseURL: `${SERVER_URL}`,
  };
}

function makeInstance() {
  const instanceConfig = makeConfig();
  const instance = axios.create(instanceConfig);
  instance.interceptors.request.use(
    (config) => config,
    (error) => {
      Promise.reject(error);
    },
  ); // Response interceptor for API

  // eslint-disable-next-line no-use-before-define
  instance.interceptors.response.use(
    (response) => response?.data,
    (error) => Promise.reject(error?.response),
  );
  return instance;
}

const baseAddress = makeInstance("");

const getAllProducts = (Category) => {
  const url = Category ? `products?category=${Category}` : `products`;
  return baseAddress.get(url);
};

const getProductsByPriceRangeAndInventory = ({
  isAvailable,
  category,
  fromPrice = 0,
  toPrice = 10000000000000,
}) => {
  let url = category
    ? `products?category=${category}&price_gte=${fromPrice}&price_lte=${toPrice}`
    : `products?&price_gte=${fromPrice}&price_lte=${toPrice}`;
  if (isAvailable) {
    url = url + `&isAvailable=${isAvailable}`;
  }
  return baseAddress.get(url);
};

const getProductById = (id) => {
  const url = `products/${id}`;
  return baseAddress.get(url);
};

const getPopularGoods = () => {
  const url = `products?_limit=6&_sort=rating.rate&_order=desc`;
  return baseAddress.get(url);
};

const getAllCategories = () => {
  const url = `categories`;
  return baseAddress.get(url);
};

const getUserCart = (userId) => {
  const url = `usersCart?userId=${userId}`;
  return baseAddress.get(url);
};

const updateUserCart = (id, command) => {
  const url = `usersCart/${id}`;
  return baseAddress.put(url, command);
};

const getSearchResult = (value) => {
  const url = `products?filter=title:${value}`;
  return baseAddress.get(url);
};

const productServices = {
  getAllProducts,
  getAllCategories,
  getProductById,
  getProductsByPriceRangeAndInventory,
  updateUserCart,
  getUserCart,
  getPopularGoods,
  getSearchResult,
};

export default productServices;
