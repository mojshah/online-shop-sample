import axios from "axios";

const SERVER_URL = "http://localhost:9000";

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
const createUser = (command) => {
  const url = `users`;
  return baseAddress.post(url, command);
};

const getUser = (email) => {
  const url = `users?email=${email}`;
  return baseAddress.get(url);
};

const createCart = (command) => {
  const url = `usersCart`;
  return baseAddress.post(url, command);
};
const login = (userData) => {
  const url = `users?email=${userData.email}&password=${userData.password}`;
  return baseAddress.get(url);
};

const authServices = { createUser, login, createCart, getUser };

export default authServices;
