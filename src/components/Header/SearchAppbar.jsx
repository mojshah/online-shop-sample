import { useEffect, useRef, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import FormatSearchResult from "../generalComponents/FormatSearchResult";
import _ from "lodash";
import productServices from "../../services/product";
import { useQuery } from "react-query";
import { useWindowSize } from "@uidotdev/usehooks";
import useOutsideClickChecker from "../../helper/useOutsideClickChecker";

const SearchStyled = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: alpha(theme.palette.common.white, 0.3),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: "flex",
  justifyContent: "start",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginRight: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const SearchAppbar = () => {
  const searchRef = useRef();
  const componentAreaRef = useRef();
  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const size = useWindowSize();
  useOutsideClickChecker(componentAreaRef, setSearchValue, setResult);
  const resultStyle = {
    position: "absolute",
    backgroundColor: "whitesmoke",
    width: searchRef?.current?.clientWidth,
    minHeight: 250,
    maxHeight: size.height / 2,
    borderBottom: "1px solid black",
    mt: "3px",
    borderRadius: "5px 5px 10px 10px",
    overflowY: "auto",
    alignItems: result.length < 1 && { xs: "start", md: "center" },
    justifyContent: result.length < 1 && "center",
    display: result.length < 1 ? "flex" : "block",
    zIndex: 99999,
  };

  const { data } = useQuery(
    "gerAllProductsForFilter",
    () => productServices.getAllProducts(),
    { refetchOnWindowFocus: false },
  );

  const searchInProducts = _.debounce(() => {
    if (data && searchValue) {
      const filterData = data?.filter((x) => {
        return (
          x?.title?.toLowerCase()?.match(searchValue.toLowerCase()) ||
          x?.description?.toLowerCase()?.match(searchValue.toLowerCase())
        );
      });
      setResult(filterData);
    }
  }, 1000);

  useEffect(() => {
    searchInProducts(searchValue);
  }, [searchValue]);

  return (
    <Box ref={componentAreaRef}>
      <SearchStyled ref={searchRef}>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="جستجو ..."
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </SearchStyled>

      {searchValue && (
        <Box sx={resultStyle}>
          {result.length > 0 ? (
            result?.map((item, index) => (
              <FormatSearchResult key={index} item={item} />
            ))
          ) : (
            <Typography sx={{ color: "silver" }} textAlign={"center"}>
              نتیجه ای یافت نشد
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchAppbar;
