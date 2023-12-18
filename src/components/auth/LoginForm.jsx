import { useContext } from "react";
import { useSetRecoilState } from "recoil";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import loginSchema from "../../schema/loginSchema";
import Grid from "@mui/material/Unstable_Grid2";
import { Cancel } from "@mui/icons-material";
import authServices from "../../services/auth";
import { toast } from "react-toastify";
import { auth } from "../../atom";
import { UpdateCartContext } from "../../context";
import { useMutation } from "react-query";

const LoginForm = () => {
  const setUserAuth = useSetRecoilState(auth);
  const { openLogin, setOpenLogin, handleClickOpenRegister } =
    useContext(UpdateCartContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const handleClose = () => {
    setOpenLogin(false);
  };

  const openRegister = () => {
    handleClose();
    handleClickOpenRegister();
  };

  const mutation = useMutation(authServices.login, {
    onSuccess: (response) => {
      if (response.length > 0) {
        toast.success("با موفقیت وارد شدید.");
        setUserAuth({ userInfo: response[0], isLogin: true });
        formik.resetForm();
        handleClose();
        localStorage.setItem("userInfo", JSON.stringify(response[0]));
      } else {
        toast.error("نام کاربر یا رمز عبور اشتباه است.");
      }
    },
    onError: () => {
      toast.error("خطا در انجام عملیات.");
    },
  });

  const login = (userData) => {
    mutation.mutate(userData);
  };

  return (
    <Grid>
      <Dialog
        open={openLogin}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogActions>
          <IconButton onClick={handleClose}>
            <Cancel color="error" />
          </IconButton>
        </DialogActions>
        <DialogTitle>
          <Typography textAlign="center">ورود</Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 5 }}>
          <form onSubmit={formik.handleSubmit} autocomplete="off">
            <TextField
              fullWidth
              id="email"
              name="email"
              label="نام کاربری (ایمیل)"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ my: 2 }}
              inputProps={{
                autoComplete: "new-email",
              }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="رمز عبور"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ my: 2 }}
              inputProps={{
                autoComplete: "new-password",
              }}
            />
            <Button
              color="success"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              ورود
            </Button>
            <Button fullWidth sx={{ mt: 3 }} onClick={openRegister}>
              عضویت
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default LoginForm;
