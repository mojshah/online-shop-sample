import { atom } from "recoil";

const cartIds = atom({
  key: "cartIds",
  default: {
    cartId: null,
    userId: null,
  },
});

export default cartIds;
