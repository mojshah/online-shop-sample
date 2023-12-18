import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormatSearchResult = ({ item }) => {
  const navigate = useNavigate();
  const goToProductDetails = (item) => {
    navigate(`/productList/${item.category}/${item.id}`);
    window.location.reload(true);
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          px: 3,
          backgroundColor: "whitesmoke",
        }}
        onClick={() => goToProductDetails(item)}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            height: 50,
            width: 50,
          }}
          image={item.image}
        />
        <Box>
          <CardContent>
            <Typography variant="body1">{item.title}</Typography>
          </CardContent>
        </Box>
      </Card>
      <Divider />
    </>
  );
};

export default FormatSearchResult;
