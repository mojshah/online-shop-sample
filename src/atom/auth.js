import { atom } from "recoil";

const auth = atom({
  key: "auth",
  default: {
    userInfo: {
      username: "",
      password: "",
      cart: [],
      name: "",
      lastName: "",
    },
    isLogin: false,
  },
});

export default auth;
