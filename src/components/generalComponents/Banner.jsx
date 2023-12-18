import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Slider from "react-slick";
import img1 from "../../assets/images/slider.webp";
import img2 from "../../assets/images/slider-1.webp";
import img3 from "../../assets/images/slider-2.webp";
import img4 from "../../assets/images/slider-3.webp";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    cssEase: "linear",
  };

  const bannerImages = [img1, img2, img3, img4];

  return (
    <Grid
      mb={10}
      mt={{
        xs: 5,
        lg: 0,
      }}
      xs={12}
    >
      <Slider {...settings}>
        {bannerImages.map((image, index) => (
          <Box key={index}>
            <img src={image} alt={`image${index}`} width={"100%"} />
          </Box>
        ))}
      </Slider>
    </Grid>
  );
};

export default Banner;
