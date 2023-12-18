import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import productServices from "../../services/product";
import { Grade } from "@mui/icons-material";
import { useQuery } from "react-query";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const PopularGoods = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLoading, data } = useQuery(
    "getPopularGoods",
    productServices.getPopularGoods,
    { refetchOnWindowFocus: false },
  );

  const goToProductDetails = (item) => {
    navigate(`/productList/${item.category}/${item.id}`);
  };

  return (
    <>
      <Grid
        sx={{
          backgroundColor: theme.palette.warning.dark,
          py: 5,
        }}
        xs={12}
        container
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Grid item xs={12} mb={3}>
          <Typography
            textAlign={"center"}
            color={"whitesmoke"}
            fontWeight={"bold"}
            variant="h5"
          >
            کالاهای های محبوب
          </Typography>
        </Grid>

        <Grid
          sx={{
            backgroundColor: "white",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
          item
          xs={12}
          lg={10}
          px={1}
        >
          <Grid
            xs={12}
            container
            py={3}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={{ xs: "column", lg: "row" }}
            spacing={5}
          >
            {data?.map((pic, index) => (
              <Grid item key={index}>
                <Box
                  onClick={() => goToProductDetails(pic)}
                  sx={{
                    height: 200,
                    maxHeight: 200,
                    borderRadius: "10px",
                    backgroundColor: "whitesmoke",
                    "&:hover": {
                      opacity: [0.9, 0.8, 0.7],
                    },
                    mb: 2,
                  }}
                  key={pic?.id}
                >
                  <Box
                    component="img"
                    src={pic.image}
                    alt=""
                    width={150}
                    height={1}
                    sx={{
                      borderRadius: "10px",
                    }}
                  />
                  <Typography variant="subtitle1" textAlign="center">
                    {`امتیاز : ${pic?.rating?.rate}`}
                    <Grade
                      sx={{ verticalAlign: "middle", height: 16 }}
                      color={pic?.rating?.rate < 4 ? "error" : "success"}
                    />
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PopularGoods;
