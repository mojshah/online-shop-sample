import spinnerGif from "../../assets/Spinner.gif";
import Grid from "@mui/material/Unstable_Grid2";

const Spinner = () => {
  return (
    <Grid
      xs={12}
      my={3}
      container
      justifyContent={"center"}
      sx={{ overflowX: "hidden", backgroundColor: "white" }}
    >
      <img
        src={spinnerGif}
        alt=""
        className="m-auto d-block"
        style={{ width: "200px" }}
      />
    </Grid>
  );
};

export default Spinner;
