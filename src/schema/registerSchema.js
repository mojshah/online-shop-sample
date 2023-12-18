import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("نام الزامی می باشد."),
  lastName: Yup.string().required(" نام خانوادگی الزامی می باشد."),
  email: Yup.string()
    .email("آدرس ایمیل معتبر نیست")
    .required(" آدرس ایمیل الزامی می باشد."),
  password: Yup.string().required("رمزعبور الزامی می باشد."),
  repeatPassword: Yup.string()
    .required("تکرار رمز عبور الزامی می باشد")
    .oneOf(
      [Yup.ref("password"), null],
      "تکرار رمز عبور با رمز عبور مطابقت ندارد ",
    ),
});

export default registerSchema;
