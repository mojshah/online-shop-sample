import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Badge, Box, Button, IconButton } from "@mui/material";
import {
  AddCircleOutline,
  AddShoppingCart,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { cartManagement } from "../../atom";

const CartProductCountManagement = ({ product, addIcon = true }) => {
  const [cart, setCart] = useRecoilState(cartManagement);
  const [currentProductCount, setCurrentProductCount] = useState(0);

  useEffect(() => {
    const productCount = cart?.filter((x) => x?.id == product.id);
    setCurrentProductCount(productCount?.length || 0);
  }, [product]);

  const increaseCountProduct = () => {
    setCurrentProductCount((prevState) => prevState + 1);
    setCart([...cart, product]);
  };

  const decreaseCountProduct = () => {
    const copyCart = [...cart];
    const index = copyCart.findIndex((x) => x.id == product.id);
    copyCart.splice(index, 1);
    setCart(copyCart);
    setCurrentProductCount((prevState) => prevState - 1);
  };

  const deleteAll = () => {
    const copyCart = cart.filter((x) => x?.id != product.id);
    setCart(copyCart);
    setCurrentProductCount(0);
  };

  return (
    <>
      {currentProductCount > 0 ? (
        <Box>
          <IconButton onClick={deleteAll} aria-label="delete">
            <Delete color="error" />
          </IconButton>
          <IconButton onClick={decreaseCountProduct} aria-label="minus">
            <RemoveCircleOutline />
          </IconButton>
          <Badge
            badgeContent={currentProductCount}
            color="warning"
            max={999}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ mx: 2 }}
          />
          <IconButton onClick={increaseCountProduct} aria-label="Add">
            <AddCircleOutline />
          </IconButton>
        </Box>
      ) : (
        <>
          {addIcon ? (
            <IconButton aria-label="AddShopping" onClick={increaseCountProduct}>
              <AddShoppingCart color={"warning"} />
            </IconButton>
          ) : (
            <Button
              sx={{ width: 1 }}
              size="large"
              variant="contained"
              color="error"
              onClick={increaseCountProduct}
            >
              افزودن به سبد خرید
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default CartProductCountManagement;
