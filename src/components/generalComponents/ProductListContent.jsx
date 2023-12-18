import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { Grade } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { CartProductCountManagement } from "..";
import notFound from "../../assets/no-found.gif";

const ProductListContent = ({ filteredProducts, showFilter }) => {
  const navigate = useNavigate();
  const goToProductDetails = (item) => {
    navigate(`/productList/${item.category}/${item.id}`);
  };

  return (
    <>
      {filteredProducts?.length > 0 ? (
        <Grid
          xs={12}
          container
          justifyContent={"center"}
          alignItems={"center"}
          rowSpacing={3}
        >
          {filteredProducts?.map((item, index) => (
            <Grid item xs={12} lg={3} key={index}>
              <Card
                sx={{
                  maxWidth: 1,
                  p: 1,
                  height: 450,
                  border: "none",
                  borderRadius: 0,
                  boxShadow: "none",
                  cursor: "pointer",
                  zoom: {
                    xs: 1.2,
                    lg: 0.8,
                  },
                  "&:hover": {
                    borderBottom: "1px solid silver",
                  },
                }}
              >
                <CardMedia
                  onClick={() => goToProductDetails(item)}
                  component="img"
                  sx={{
                    objectFit: "contain",
                    height: 200,
                    maxHeight: 200,
                  }}
                  image={item.image}
                  alt="Paella dish"
                />
                <CardContent onClick={() => goToProductDetails(item)}>
                  <Typography
                    variant="body2"
                    textAlign={"justify"}
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      height: 100,
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Divider />

                  <Typography
                    variant="h5"
                    textAlign="center"
                    color="text.primary"
                    mt={2}
                  >
                    {`${item.price} تومان `}
                  </Typography>
                  <Typography fontWeight={"bold"} textAlign="center" mt={1}>
                    {`امتیاز : ${item?.rating?.rate}`}
                    <Grade
                      sx={{ verticalAlign: "middle", height: 16 }}
                      color={item?.rating?.rate < 4 ? "error" : "success"}
                    />
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  {item?.isAvailable ? (
                    <CartProductCountManagement product={item} />
                  ) : (
                    <Typography pb={2}>ناموجود</Typography>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          xs={12}
          container
          justifyContent={"center"}
          sx={{ overflowX: "hidden", backgroundColor: "white" }}
        >
          <Box
            component={"img"}
            src={notFound}
            sx={{ mx: "auto", width: 500, height: 400, display: "block" }}
          />
        </Grid>
      )}
    </>
  );
};

export default ProductListContent;
