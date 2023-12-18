import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toolbar, Box } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import { Home, ProductList, ProductDetails, CartItemList } from "./pages";
import { Footer, HeaderAppBar, Spinner } from "./components";

function App() {
  const PrivateRoute = lazy(() => import("./helper/PrivateRoute"));
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer rtl={true} theme="colored" />
      <MainLayout>
        <HeaderAppBar />
        <Toolbar />
        <Routes>
          <Route path={"/"} element={<Navigate to="/home" />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/productList/:categories"} element={<ProductList />} />
          <Route
            path={"/cart"}
            element={
              <Suspense
                fallback={
                  <Box
                    sx={{
                      width: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Spinner />
                  </Box>
                }
              >
                <PrivateRoute>
                  <CartItemList />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path={"/productList/:category/:id"}
            element={<ProductDetails />}
          />
        </Routes>
        <Footer />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
