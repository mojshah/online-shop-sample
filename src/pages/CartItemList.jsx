import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import _ from "lodash";
import { cartManagement } from "../atom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Grade } from "@mui/icons-material";
import { CartProductCountManagement, DividerTitle } from "../components";
import cartImage from "../assets/cart/shopping-cart-304843.svg";
import emptyCart from "../assets/cart/emptyCart.jpg";

const CartItemList = () => {
  const cart = useRecoilValue(cartManagement);
  const [groupedProduct, setGroupedProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categorized = _.groupBy(cart, "id");
    const categorizedArray = [];
    _.forEach(categorized, (value, key) => {
      categorizedArray.push(value);
    });

    const result = categorizedArray.map((group) => ({
      ...group[0],
      qty: group.length,
    }));
    setGroupedProduct(result);
  }, [cart]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const goToProductDetails = (item) => {
    navigate(`/productList/${item.category}/${item.id}`);
  };
  return (
    <>
      <Helmet>
        <title>سبد خرید </title>
      </Helmet>
      {cart?.length > 0 ? (
        <Grid container spacing={1} justifyContent={"center"} mt={10}>
          <Grid item xs={12} md={8}>
            {groupedProduct?.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  mb: 4,
                  p: 1,
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    height: 200,
                    width: 250,
                    cursor: "pointer",
                  }}
                  image={item.image}
                  onClick={() => goToProductDetails(item)}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 10,
                    width: 300,
                  }}
                >
                  <CardContent>
                    <Typography textAlign={"center"} variant="body1">
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        width: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 10,
                      }}
                    >
                      <Typography textAlign={"center"} variant="caption">
                        {`${item?.rating?.count} نفر به این کالا امتیاز داده اند `}
                      </Typography>
                      <Typography textAlign={"center"} fontWeight={"bold"}>
                        {`امتیاز : ${item?.rating?.rate}`}
                        <Grade
                          sx={{ verticalAlign: "middle", height: 16 }}
                          color={item?.rating?.rate < 4 ? "error" : "success"}
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 250,
                    borderLeft: {
                      xs: "none",
                      md: "1px solid black",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={cartImage} height="150px" alt="cart" />
                  <Box
                    sx={{
                      width: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      my: 3,
                    }}
                  >
                    <Typography
                      textAlign={"center"}
                      variant="h6"
                      textAlign={"center"}
                    >
                      قیمت :
                    </Typography>

                    <Typography textAlign={"center"} variant="h5" mx={2}>
                      {item?.price}
                    </Typography>

                    <Typography
                      textAlign={"center"}
                      variant="h6"
                      textAlign={"center"}
                    >
                      تومان
                    </Typography>
                  </Box>
                  {item?.isAvailable ? (
                    <CartProductCountManagement product={item} />
                  ) : (
                    <Typography>ناموجود</Typography>
                  )}
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <DividerTitle title={"اطلاعات فروش"} />
            <Grid
              sx={{
                p: 6,
                mt: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 400,
              }}
            >
              <Typography variant="h6" textAlign={"center"}>
                {`مجموع اقلام : ${cart.length}`}
              </Typography>

              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" textAlign={"center"}>
                  قیمت کل:
                </Typography>

                <Typography variant="h4" sx={{ mx: 2 }}>
                  {_.sumBy(cart, "price").toFixed(3)}
                </Typography>

                <Typography variant="h6" textAlign={"center"}>
                  تومان
                </Typography>
              </Box>

              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: 1,
                  mt: 5,
                }}
              >
                <Button
                  variant={"contained"}
                  color={"success"}
                  sx={{ width: 1 }}
                  size="large"
                >
                  تکمیل فرایند خرید
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          sx={{ overflowX: "hidden", backgroundColor: "white" }}
          justifyContent={"center"}
        >
          <Box
            component={"img"}
            src={emptyCart}
            alt="emptyCart"
            sx={{
              display: "block",
              mx: "auto",
              width: 500,
              height: 500,
            }}
          />
        </Grid>
      )}
    </>
  );
};

export default CartItemList;
