import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("آدرس ایمیل معتبر نیست")
    .required(" آدرس ایمیل الزامی می باشد."),
  password: Yup.string().required("این گزینه الزامی می باشد"),
});

export default loginSchema;
