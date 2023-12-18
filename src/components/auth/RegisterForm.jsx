import { useContext, useState } from "react";
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
import Grid from "@mui/material/Unstable_Grid2";
import { Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";
import registerSchema from "../../schema/registerSchema";
import authServices from "../../services/auth";
import { UpdateCartContext } from "../../context";
import { useMutation } from "react-query";

const RegisterForm = () => {
  const { openRegister, setOpenRegister, handleClickOpenLogin } =
    useContext(UpdateCartContext);
  const [formData, setFormData] = useState(null);
  const handleClose = () => {
    setOpenRegister(false);
  };

  const openLogin = () => {
    handleClose();
    handleClickOpenLogin();
  };

  const mutationFirstCart = useMutation(
    (command) => authServices.createCart(command),
    {
      onSuccess: () => {
        toast.success(" اطلاعات کاربر جدید با موفقیت ثبت شد.");
        handleClose();
        handleClickOpenLogin();
        formik.resetForm();
      },
      onError: () => toast.error("خطا در انجام عملیات."),
    },
  );
  const createFirstCart = (userId) => {
    const command = { cart: [], userId };
    mutationFirstCart.mutate(command);
  };

  const mutation = useMutation((command) => authServices.createUser(command), {
    onSuccess: (respons) => {
      createFirstCart(respons.id);
    },
    onError: () => toast.error("خطا در انجام عملیات."),
  });

  const createUser = (command) => {
    command.userName = command.email;
    mutation.mutate(command);
  };

  const checkUserNameMutation = useMutation(
    (command) => authServices.getUser(command),
    {
      onSuccess: (response) => {
        if (response.length > 0) {
          return toast.error("این آدرس ایمیل دارای حساب کاربری می باشد");
        }
        createUser(formData);
      },
      onError: () => toast.error("خطا در انجام عملیات."),
    },
  );
  const checkUserName = (details) => {
    checkUserNameMutation.mutate(details);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      setFormData(values);
      checkUserName(values);
    },
    validationSchema: registerSchema,
  });

  return (
    <Grid>
      <Dialog
        open={openRegister}
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
          <Typography textAlign="center">عضویت</Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 5 }}>
          <form onSubmit={formik.handleSubmit} autocomplete="off">
            <TextField
              size="small"
              fullWidth
              id="name"
              name="name"
              label="نام"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ my: 2 }}
              inputProps={{
                autoComplete: "new-name",
              }}
            />
            <TextField
              size="small"
              fullWidth
              id="lastName"
              name="lastName"
              label="نام خانوادگی"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ my: 2 }}
              inputProps={{
                autoComplete: "new-lastName",
              }}
            />

            <TextField
              size="small"
              fullWidth
              id="email"
              name="email"
              label="ایمیل"
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
              size="small"
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

            <TextField
              size="small"
              fullWidth
              id="repeatPassword"
              name="repeatPassword"
              label=" تکرار رمز عبور"
              type="password"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.repeatPassword &&
                Boolean(formik.errors.repeatPassword)
              }
              helperText={
                formik.touched.repeatPassword && formik.errors.repeatPassword
              }
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
              ثبت
            </Button>
            <Button fullWidth sx={{ mt: 3 }} onClick={openLogin}>
              ورود
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default RegisterForm;
