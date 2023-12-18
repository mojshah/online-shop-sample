import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet-async";
import { productListManagement } from "../atom";
import {
  Typography,
  Box,
  Breadcrumbs,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import productServices from "../services/product";
import {
  ControlledAccordions,
  ProductListContent,
  Spinner,
  SideFilter,
} from "../components";
import { FilterList } from "@mui/icons-material";
import { useQuery } from "react-query";
import { useImmer } from "use-immer";

const CustomControlledAccordions = styled(ControlledAccordions)();

const ProductList = ({ showFilter = true, showBreadcrumbs = true }) => {
  const [products, setProducts] = useRecoilState(productListManagement);
  const [filteredProducts, setFilteredProducts] = useImmer();
  const { categories } = useParams();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { isLoading, refetch } = useQuery(
    "gerAllProducts",
    () => productServices.getAllProducts(categories),
    {
      onSuccess: (response) => {
        setProducts(response);
        setFilteredProducts(response);
      },
      refetchOnWindowFocus: false,
    },
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    refetch();
  }, [categories]);

  return (
    <>
      {categories && (
        <Helmet>
          <title>{categories}</title>
        </Helmet>
      )}
      {isLoading ? (
        <Grid container xs={12} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Grid>
      ) : (
        <Grid
          container
          columnSpacing={{ lg: 2 }}
          justifyContent={"center"}
          xs={12}
          sx={{ backgroundColor: "white", py: 5 }}
        >
          {showBreadcrumbs && (
            <Box
              sx={{
                display: "flex",
                width: 1,
                p: 5,
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">صفحه اصلی</Link>
                <Typography color="text.primary">{categories}</Typography>
              </Breadcrumbs>
            </Box>
          )}

          {showFilter && !isMdUp && (
            <Grid item xs={12} mb={2}>
              <CustomControlledAccordions
                sx={{
                  display: {
                    xs: "block",
                    lg: "none",
                  },
                  width: 1,
                }}
                title={<FilterList sx={{ color: "whitesmoke" }} />}
              >
                <SideFilter
                  setFilteredProducts={setFilteredProducts}
                  category={categories}
                />
              </CustomControlledAccordions>
            </Grid>
          )}

          {showFilter && isMdUp && (
            <Grid lg={3}>
              <SideFilter
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },
                }}
                setFilteredProducts={setFilteredProducts}
                category={categories}
              />
            </Grid>
          )}
          <Grid item xs={12} lg={9}>
            <ProductListContent
              filteredProducts={filteredProducts}
              showFilter={showFilter}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductList;
