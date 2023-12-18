import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { ProductList } from ".";
import productServices from "../services/product";
import { Banner, PopularGoods } from "../components";
import { useQuery } from "react-query";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useQuery("getAllCategories", productServices.getAllCategories, {
    onSuccess: (response) => {
      setCategories(response);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Helmet>
        <title>صفحه اصلی </title>
      </Helmet>
      <Banner />
      <PopularGoods categories={categories} />
      <ProductList showBreadcrumbs={false} />
    </Box>
  );
};

export default Home;
