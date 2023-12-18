import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Divider, Popover, Typography } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesMenu = ({ handleClose }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const categories = [
    { value: "electronics", title: "کالای دیجیتال" },
    { value: "jewelery", title: "جواهرات و زینتی" },
    { value: "men's clothing", title: "لباس های مردانه" },
    { value: "women's clothing", title: "لباس های زنانه" },
  ];

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  const handleClickMenuItem = (event, item) => {
    setOpen(!open);
    handleClose();
    if (item) {
      navigate(`/productList/${item?.value}`);
    } else {
      navigate("/");
    }
  };

  const iconAnimation = {
    transition: "transform 0.1s",
    transform: open ? "rotate(-90deg)" : null,
  };

  const subMenuButtonStyle = {
    zIndex: 999,
    ":hover": {
      backgroundColor: "lightGrey",
    },
  };
  return (
    <Grid container xs={12} justifyContent={"center"}>
      <Button
        endIcon={<KeyboardArrowLeft sx={iconAnimation} />}
        sx={{ color: "whiteSmoke", position: "relative" }}
        onClick={handleClickMenu}
      >
        دسته بندی محصولات
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transition
      >
        <Box
          display={"flex"}
          alignItems={"start"}
          flexDirection={"column"}
          width={300}
          sx={{ cursor: "pointer", zIndex: 9999 }}
        >
          <Button
            fullWidth
            onClick={(event) => handleClickMenuItem(event)}
            color={"warning"}
            sx={subMenuButtonStyle}
          >
            <Typography width={1} textAlign={"left"}>
              صفحه اصلی
            </Typography>
          </Button>
          <Divider sx={{ width: 1 }} />
          {categories?.map((item, index) => (
            <Fragment key={index}>
              <Button
                fullWidth
                onClick={(event) => handleClickMenuItem(event, item)}
                endIcon={<KeyboardArrowLeft />}
                color={"warning"}
                sx={subMenuButtonStyle}
              >
                <Typography width={1} textAlign={"left"}>
                  {item?.title}
                </Typography>
              </Button>
              {index < categories.length - 1 && <Divider sx={{ width: 1 }} />}
            </Fragment>
          ))}
        </Box>
      </Popover>
    </Grid>
  );
};

export default CategoriesMenu;
