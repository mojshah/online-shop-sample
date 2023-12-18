import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Divider,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import _ from "lodash";
import productServices from "../../services/product";
import { useMutation } from "react-query";

const SideFilter = ({ setFilteredProducts, category, className }) => {
  const [fromPrice, setFromPrice] = useState();
  const [toPrice, setToPrice] = useState();
  const [switchValue, setSwitchValue] = useState(false);

  const mutation = useMutation(
    "filterProducts",
    (command) => productServices.getProductsByPriceRangeAndInventory(command),
    {
      onSuccess: (respons) => {
        setFilteredProducts(respons);
      },
    },
  );
  const getByPriceRangeInventory = () => {
    const command = {
      category: category,
      isAvailable: switchValue,
    };

    if (fromPrice > 0) {
      command.fromPrice = fromPrice;
    }
    if (toPrice > 0) {
      command.toPrice = toPrice;
    }

    mutation.mutate(command);
  };

  const filterByPrice = _.debounce(() => {
    getByPriceRangeInventory();
  }, 1000);

  const sortByPrice = (type) => {
    switch (type) {
      case "asc":
        setFilteredProducts((draft) => {
          draft.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        });
        break;
      case "desc":
        setFilteredProducts((draft) => {
          draft.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        });
        break;
    }
  };

  const sortByPopularity = () => {
    setFilteredProducts((draft) => {
      draft.sort(
        (a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate),
      );
    });
  };

  const fromPriceHandler = (event) => {
    const castToNumber = parseFloat(event.target.value || 0);
    setFromPrice(castToNumber);
  };
  const toPriceHandler = (event) => {
    const castToNumber = parseFloat(event.target.value || 0);
    setToPrice(castToNumber);
  };

  useEffect(() => {
    filterByPrice();
  }, [switchValue, fromPrice, toPrice]);

  return (
    <Grid
      className={className}
      xs={12}
      height={1}
      sx={{
        alignItems: "center",

        flexDirection: {
          xs: "column",
          lg: "row",
        },
        borderRadius: "5px",
        px: 3,
      }}
    >
      <Typography variant="h5" my={2}>
        فیلترها
      </Typography>

      <Divider mt={5} />

      <FormControlLabel
        sx={{ my: 5 }}
        control={
          <Switch
            color="warning"
            onChange={(event) => setSwitchValue(event.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="فقط کالا های موجود"
      />

      <Divider />

      <Typography variant="subtitle1" sx={{ my: 2 }}>
        محدوده قیمت{" "}
      </Typography>

      <TextField
        id="outlined-number"
        label={<Typography variant="h5">از</Typography>}
        type="number"
        color={"warning"}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={fromPrice}
        sx={{
          my: 2,
        }}
        onChange={fromPriceHandler}
      />

      <TextField
        id="outlined-number"
        label={<Typography variant="h5">تا </Typography>}
        type="number"
        color={"warning"}
        fullWidth
        value={toPrice}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          my: 2,
        }}
        onChange={toPriceHandler}
      />
      <Divider />
      <Grid sx={{ width: 1 }}>
        <Button
          sx={{ my: 1, width: 1 }}
          variant="contained"
          color={"warning"}
          onClick={() => sortByPrice("desc")}
        >
          بر اساس بیشترین قیمت
        </Button>
        <Button
          sx={{ my: 1, width: 1 }}
          variant="contained"
          color={"warning"}
          onClick={() => sortByPrice("asc")}
        >
          بر اساس کمترین قیمت
        </Button>
        <Button
          sx={{ my: 1, width: 1 }}
          variant="contained"
          color={"warning"}
          onClick={sortByPopularity}
        >
          بر اساس محبوب ترین
        </Button>
      </Grid>
    </Grid>
  );
};

export default SideFilter;
