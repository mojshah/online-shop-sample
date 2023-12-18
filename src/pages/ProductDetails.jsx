import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartManagement } from "../atom";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  Breadcrumbs,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MoreHoriz, Grade, Cancel } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import ReactImageMagnify from "react-image-magnify";
import productServices from "../services/product";
import { DividerTitle, CartProductCountManagement } from "../components";
import { useQuery } from "react-query";

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [imgList, setImgList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isLoading, data } = useQuery(
    "getProductById",
    () => productServices.getProductById(id),
    {
      onSuccess: (response) => {
        setSelectedImage(response.image);
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    setImgList([
      data?.image,
      data?.image,
      data?.image,
      data?.image,
      data?.image,
      data?.image,
      data?.image,
    ]);
    console.log(imgList);
  }, [data]);

  const selectImgHandler = (img) => {
    setSelectedImage(img);
  };
  return (
    <>
      <Helmet>
        <title>جزییات محصول </title>
      </Helmet>
      {!isLoading && (
        <>
          <Grid
            xs={12}
            container
            sx={{ mt: 5, borderBottom: "1px solid #cccccc" }}
          >
            <Grid xs={12} m={3} item>
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">صفحه اصلی</Link>
                <Link to={`/productList/${data?.category}`}>
                  {data?.category}
                </Link>
                <Typography color="text.primary">{data?.title}</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ width: 1, display: "block", mx: "auto", mb: 5 }}>
                <CardContent>
                  <Grid container xs={12}>
                    <Grid xs={12} item sx={{ p: 5 }}>
                      <ReactImageMagnify
                        {...{
                          hoverOffDelayInMs: 500,
                          fadeDurationInMs: 500,
                          smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            src: `${selectedImage}`,
                            width: 300,
                            height: 400,
                          },
                          largeImage: {
                            alt: "",
                            src: `${selectedImage}`,
                            width: 700,
                            height: 700,
                          },
                          shouldUsePositiveSpaceLens: true,
                          enlargedImagePosition: "over",
                          enlargedImageContainerDimensions: {
                            height: "100%",
                            width: "100%",
                          },
                          isHintEnabled: true,
                        }}
                      />
                    </Grid>
                    <Grid xs={12} item spacing={1}>
                      <Grid xs={12} container spacing={2}>
                        {imgList?.map(
                          (img, index) =>
                            index < 6 && (
                              <Grid
                                item
                                key={index}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  border: "1px solid #cccccc",
                                  borderRadius: "5px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Card
                                  onClick={() => selectImgHandler(img)}
                                  sx={{
                                    width: 35,
                                    cursor: "pointer",
                                  }}
                                >
                                  <CardMedia
                                    sx={{ height: 35, opacity: "0.5" }}
                                    image={img}
                                    title="green iguana"
                                  />
                                </Card>
                              </Grid>
                            ),
                        )}

                        {imgList?.length > 6 && (
                          <Grid
                            item
                            sx={{
                              width: 60,
                              height: 60,
                              border: "1px solid #cccccc",
                              borderRadius: "5px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Card
                              onClick={handleClickOpen}
                              sx={{
                                width: 35,
                                height: 35,
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  mt: 1,
                                }}
                              >
                                <MoreHoriz color="disabled" />
                              </CardContent>
                            </Card>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} md={5}>
              <DividerTitle title={"جزییات محصول"} alignment={"left"} />

              <Grid sx={{ p: 6 }}>
                <Typography variant="h5" textAlign="left">
                  {data?.title}
                </Typography>
              </Grid>

              <Grid sx={{ p: 6, mt: 5 }}>
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">
                    {`${data?.rating?.count} نفر به این کالا امتیاز داده اند `}
                  </Typography>
                  <Typography>
                    {`امتیاز : ${data?.rating?.rate}`}
                    <Grade
                      sx={{ verticalAlign: "middle", height: 16 }}
                      color={data?.rating?.rate < 4 ? "error" : "success"}
                    />
                  </Typography>
                </Box>

                <Box sx={{ width: 1, mt: 5 }}>
                  <Typography variant="h6">توضیحات :</Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      overflowWrap: "break-word",
                    }}
                  >
                    {data?.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={12} md={3}>
              <DividerTitle title={"اطلاعات فروش"} />
              <Grid
                sx={{
                  p: 6,
                  mt: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 400,
                }}
              >
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" textAlign={"center"}>
                    قیمت :
                  </Typography>

                  <Typography variant="h4" sx={{ mx: 2 }}>
                    {data?.price}
                  </Typography>

                  <Typography variant="h6" textAlign={"center"}>
                    تومان
                  </Typography>
                </Box>
                <Box sx={{ width: 1 }}>
                  <Typography variant="caption" textAlign={"center"}>
                    شناسه کالا : {`ID-${data?.id} -Title- ${data?.title}`}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: 1,
                    mt: 5,
                  }}
                >
                  {data?.isAvailable ? (
                    <CartProductCountManagement
                      product={data}
                      addIcon={false}
                    />
                  ) : (
                    <Typography>ناموجود</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
          >
            <DialogActions>
              <IconButton onClick={handleClose}>
                <Cancel color="error" />
              </IconButton>
            </DialogActions>
            <DialogContent>
              <Grid container>
                <Grid xs={12}>
                  <Card sx={{ width: 1, display: "block", mx: "auto" }}>
                    <CardContent>
                      <Stack>
                        <ReactImageMagnify
                          style={{ display: "block", marginX: "0 auto" }}
                          {...{
                            hoverOffDelayInMs: 500,
                            fadeDurationInMs: 500,
                            smallImage: {
                              alt: "Wristwatch by Ted Baker London",
                              isFluidWidth: true,
                              src: `${selectedImage}`,
                            },
                            largeImage: {
                              alt: "",
                              src: `${selectedImage}`,
                              width: 700,
                              height: 700,
                            },
                            shouldUsePositiveSpaceLens: true,

                            enlargedImageContainerDimensions: {
                              height: "100%",
                              width: "100%",
                            },
                            // isHintEnabled: true,
                          }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {imgList?.map((img, index) => (
                      <Card
                        key={index}
                        onClick={() => selectImgHandler(img)}
                        sx={{
                          width: 35,
                          cursor: "pointer",
                          ml: 1,
                          my: 1,
                        }}
                      >
                        <CardMedia
                          sx={{ height: 35 }}
                          image={img}
                          title="green iguana"
                        />
                      </Card>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default ProductDetails;
