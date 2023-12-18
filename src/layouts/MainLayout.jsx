import { useEffect, useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { Box, ThemeProvider } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { theme } from "./theme";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { auth, cartIds, cartManagement } from "../atom";
import { UpdateCartContext } from "../context";
import productServices from "../services/product";
import { useMutation, useQuery } from "react-query";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MainLayout = ({ children }) => {
  const [cart, setCart] = useRecoilState(cartManagement);
  const { userId, cartId } = useRecoilValue(cartIds);
  const [userAuthInfo, setUserAuthInfo] = useRecoilState(auth);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { isLogin, userInfo } = userAuthInfo;
  const setCartIds = useSetRecoilState(cartIds);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserAuthInfo({ userInfo: JSON.parse(storedUserInfo), isLogin: true });
    }
  }, []);

  useQuery("getUserCart", () => productServices.getUserCart(userInfo.id), {
    onSuccess: (response) => {
      setCartIds({ userId: response[0].userId, cartId: response[0].id });
      if (cart.length > 0) {
        let cartCopy = [...cart];
        cartCopy = cartCopy.concat(response[0].cart);
        setCart(cartCopy);
      } else {
        setCart([...response[0].cart]);
      }
    },

    onError: () => toast.error("سبد خرید یافت نشد."),
    refetchOnWindowFocus: false,
    enabled: isLogin,
  });

  const updateMutation = useMutation("updateUserCart", (command) =>
    productServices.updateUserCart(cartId, command),
  );
  useEffect(() => {
    if (!isLogin) {
      return;
    }
    const command = { userId, cart };
    updateMutation.mutate(command);
  }, [cart]);

  return (
    <UpdateCartContext.Provider
      value={{
        handleClickOpenLogin,
        handleClickOpenRegister,
        openLogin,
        openRegister,
        setOpenRegister,
        setOpenLogin,
      }}
    >
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <Box container>{children}</Box>
          </HelmetProvider>
        </ThemeProvider>
      </CacheProvider>
    </UpdateCartContext.Provider>
  );
};

export default MainLayout;
