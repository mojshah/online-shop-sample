import * as yup from "yup";

const footerSchema = yup.object().shape({
  message: yup
    .string()
    .required("هیچ متنی درج نشده است")
    .min(2, "حداقل 2 کارکتر وارد کنید"),
  email: yup
    .string()
    .required("این فیلد الزامی می باشد")
    .email("لطفا ایمیل معتبر وارد کنید"),
});

export default footerSchema;
