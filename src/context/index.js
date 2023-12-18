import { createContext } from "react";
export const UpdateCartContext = createContext({
  openLogin: false,
  openRegister: false,
  setOpenLogin: () => {},
  setOpenRegister: () => {},
  handleClickOpenLogin: () => {},
  handleClickOpenRegister: () => {},
});
