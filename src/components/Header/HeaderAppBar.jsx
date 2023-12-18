import { AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RightAppBarContainer, LeftAppBarContent } from "..";
import Grid from "@mui/material/Unstable_Grid2";
import SearchAppbar from "./SearchAppbar";

const HeaderAppBar = () => {
  const theme = useTheme();

  return (
    <AppBar sx={{ backgroundColor: theme.palette.warning.dark, py: 2 }}>
      <Toolbar>
        <Grid container xs={12} columnSpacing={3}>
          <Grid item xs={10} md={3}>
            <RightAppBarContainer />
          </Grid>

          <Grid
            item
            md={6}
            display={{
              xs: "none",
              md: "block",
            }}
          >
            <SearchAppbar />
          </Grid>

          <Grid item xs={2} md={3}>
            <LeftAppBarContent />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
