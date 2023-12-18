import { atom } from "recoil";

const cartManagement = atom({
  key: "cartManagement",
  default: [],
});

export default cartManagement;
