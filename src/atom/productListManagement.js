import { atom } from "recoil";

const productListManagement = atom({
  key: "productManagement",
  default: [],
});

export default productListManagement;
