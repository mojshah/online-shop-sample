import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import logo from "../../assets/online-shop-shopping-bag-svgrepo-com.svg";
import Grid from "@mui/material/Unstable_Grid2";
import CategoriesMenu from "../generalComponents/CategoriesMenu";
import SmallMenuAppbar from "./SmallMenuAppbar";

const RightAppBarContainer = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        xs={12}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={2}
          display={{
            xs: "block",
            md: "none",
          }}
        >
          <SmallMenuAppbar />
        </Grid>

        <Grid item xs={10} md={2}>
          <Box
            sx={{ cursor: "pointer", width: 1, height: "50px" }}
            component={"img"}
            src={logo}
            onClick={() => navigate("/")}
          />
        </Grid>

        <Grid
          item
          display={{
            xs: "none",
            md: "block",
          }}
          md={10}
        >
          <CategoriesMenu />
        </Grid>
      </Grid>
    </>
  );
};

export default RightAppBarContainer;
