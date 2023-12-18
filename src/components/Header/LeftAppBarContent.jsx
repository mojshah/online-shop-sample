import { useState, useContext } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, PersonOff, Person } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { cartManagement, auth } from "../../atom";
import { UpdateCartContext } from "../../context";
import { LoginForm, RegisterForm } from "..";

const LeftAppBarContent = () => {
  const cart = useRecoilValue(cartManagement);
  const { userInfo, isLogin } = useRecoilValue(auth);
  const resetAuth = useResetRecoilState(auth);
  const resetCart = useResetRecoilState(cartManagement);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleClickOpenLogin, handleClickOpenRegister } =
    useContext(UpdateCartContext);

  const logOut = () => {
    resetAuth();
    resetCart();
    localStorage.removeItem("userInfo");
    navigate("/home");
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          px: 3,
          cursor: "pointer",
          width: 1,
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={goToCart}
        >
          <Badge
            badgeContent={cart.length}
            color="error"
            max={999}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="account-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {isLogin ? <Person /> : <PersonOff />}
        </IconButton>
        <Menu
          id="account-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {isLogin ? (
            <Box>
              <MenuItem onClick={handleClose}>
                <Typography>
                  {`${userInfo.name} ${userInfo.lastName}`}
                </Typography>
              </MenuItem>
              <MenuItem onClick={logOut}>خروج</MenuItem>
            </Box>
          ) : (
            <MenuItem onClick={handleClose}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="text" onClick={handleClickOpenLogin}>
                  ورود
                </Button>
                <Typography>/</Typography>
                <Button variant="text" onClick={handleClickOpenRegister}>
                  عضویت
                </Button>
              </Box>
            </MenuItem>
          )}
        </Menu>
      </Box>

      <LoginForm />
      <RegisterForm />
    </>
  );
};

export default LeftAppBarContent;
