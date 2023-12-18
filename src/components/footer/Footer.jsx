import Grid from "@mui/material/Unstable_Grid2";
import footerSchema from "../../schema/footer";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {
  Instagram,
  LinkedIn,
  Telegram,
  Twitter,
  WhatsApp,
  Map,
  SupportAgent,
} from "@mui/icons-material";
import MapGl from "../map/MapGl";
import { useFormik } from "formik";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    onSubmit: (values) => {},
    validationSchema: footerSchema,
  });

  const styles = {
    footerStyle: {
      backgroundColor: theme.palette.warning.main,
      minHeight: "300px",
      flexDirection: {
        xs: "column",
        lg: "row",
      },
      justifyContent: "center",
      alignItems: "center",
      width: 1,
      py: 1,
      mt: 10,
    },
    rightFooterStyle: {
      flexDirection: "column",
      alignItems: { xs: "center", lg: "start" },
      justifyContent: "space-evenly",
      gap: 2,
    },
    leftFooterStyle: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      gap: 2,
      py: 3,
    },
  };
  const onSubmit = () => {
    console.log("Submit");
  };

  return (
    <Grid container sx={styles.footerStyle} xs={12}>
      <Grid item xs={12} lg={6} px={2}>
        <Grid sx={styles.rightFooterStyle} xs={12} container>
          <Box width={{ xs: 1, lg: "60%" }}>
            <Typography
              variant={"h6"}
              textAlign={"center"}
              color={"whitesmoke"}
              fontWeight={"bold"}
            >
              درباره ما
            </Typography>
          </Box>
          <Box>
            <Box width={{ xs: 1, lg: "60%" }}>
              <Typography
                textAlign={"justify"}
                variant={"body2"}
                color={"whitesmoke"}
              >
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </Typography>
            </Box>
          </Box>

          <Box
            width={1}
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={2}
            color={"whitesmoke"}
          >
            <Map />
            <Typography textAlign={"justify"} variant={"body2"}>
              آدرس :
            </Typography>
            <Typography textAlign={"justify"} variant={"body2"}>
              تهران سه راه تهرانپارس فروشگاه ما
            </Typography>
          </Box>

          <Box display={"flex"} width={{ xs: 1, lg: "60%" }} height={200}>
            <MapGl height={"100%"} width={"100%"} />
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6} px={2}>
        <Grid container xs={12} sx={styles.leftFooterStyle}>
          <Typography
            variant={"h5"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"whitesmoke"}
          >
            ارتباط با ما
          </Typography>

          <Box
            component={"form"}
            width={1}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Box
              width={1}
              borderRadius={"0.5rem"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <TextField
                size="small"
                fullWidth
                id="email"
                name="email"
                label="ایمیل"
                type="email"
                variant="filled"
                dir={"ltr"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  borderRadius: "0.3rem",
                  backgroundColor: "whitesmoke",
                }}
                InputLabelProps={{ shrink: true }}
              />
              {formik.touched.email && Boolean(formik.errors.email) && (
                <Box width={1}>
                  <small
                    style={{
                      textAlign: "left",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {formik.touched.email && formik.errors.email}
                  </small>
                </Box>
              )}
              <TextField
                size="small"
                fullWidth
                id="message"
                name="message"
                label={"توضیحات"}
                type="text"
                multiline
                variant="filled"
                rows={4}
                InputLabelProps={{ shrink: true }}
                sx={{
                  borderRadius: "0.3rem",
                  backgroundColor: "whitesmoke",
                }}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && Boolean(formik.errors.message) && (
                <Box width={1}>
                  <small
                    style={{
                      textAlign: "left",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {formik.touched.message && formik.errors.message}
                  </small>
                </Box>
              )}
              <Button
                type={"submit"}
                variant={"contained"}
                color={"error"}
                fullWidth
              >
                ارسال
              </Button>
            </Box>
          </Box>

          <Box
            width={1}
            display={"flex"}
            flexDirection={{
              xs: "column",
              lg: "row",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            color={"whitesmoke"}
          >
            <SupportAgent />
            <Typography textAlign={"justify"} variant={"body2"}>
              تلفن پشتیبانی :
            </Typography>
            <Typography textAlign={"justify"} variant={"body2"}>
              <a href={"tel:+982112345678"}>021-12345678</a>-
              <a href={"tel:+989035815528"}>09035815528</a>
            </Typography>
          </Box>

          <Box>
            <Typography color={"whitesmoke"} textAlign={"center"}>
              ما را در شبکه های اجتماعی دنبال کنید :
            </Typography>
            <Box display={"flex"} gap={"0.1rem"} alignItems={"center"}>
              <IconButton>
                <a href={"#"} target={"_blank"} rel={"noopener  noreferrer"}>
                  <Instagram color={"error"} />
                </a>
              </IconButton>
              <IconButton>
                <a href={"#"} target={"_blank"} rel={"noopener  noreferrer"}>
                  <Telegram sx={{ color: "#0a66c2" }} />
                </a>
              </IconButton>
              <IconButton>
                <a href={"#"} target={"_blank"} rel={"noopener  noreferrer"}>
                  <WhatsApp color={"success"} />
                </a>
              </IconButton>
              <IconButton>
                <a href={"#"} target={"_blank"} rel={"noopener  noreferrer"}>
                  <Twitter sx={{ color: "#0a66c2" }} />
                </a>
              </IconButton>
              <IconButton>
                <a href={"#"} target={"_blank"} rel={"noopener  noreferrer"}>
                  <LinkedIn sizw={"large"} sx={{ color: "#0a66c2" }} />
                </a>
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
