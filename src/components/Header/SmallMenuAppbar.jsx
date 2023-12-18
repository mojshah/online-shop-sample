import * as React from "react";
import { Popover, IconButton, Box, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useWindowSize } from "@uidotdev/usehooks";
import CategoriesMenu from "../generalComponents/CategoriesMenu";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import SearchAppbar from "./SearchAppbar";

const SmallMenuAppbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const size = useWindowSize();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isMdUp) {
      setAnchorEl(null);
    }
  }, [isMdUp]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box component={"div"}>
        <IconButton onClick={handleClick}>
          <Menu size={"large"} sx={{ color: "whitesmoke" }} />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box
            sx={{
              width: `${size.width}px`,
              py: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              backgroundColor: theme.palette.warning.dark,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "85%",
                  sm: "90%",
                },
                my: 3,
                mx: 1,
              }}
            >
              <SearchAppbar />
            </Box>
            <Box>
              <CategoriesMenu handleClose={handleClose} />
            </Box>
          </Box>
        </Popover>
      </Box>
    </>
  );
};

export default SmallMenuAppbar;
