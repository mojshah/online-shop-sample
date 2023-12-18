import { Chip, Divider, Typography } from "@mui/material";

const DividerTitle = ({ alignment = "center", title }) => {
  return (
    <Divider
      textAlign={alignment}
      sx={{
        "&::before, &::after": {},
      }}
    >
      <Chip
        label={
          <Typography
            variant="caption"
            color="black"
            sx={{ textAlign: "center" }}
          >
            {title}
          </Typography>
        }
        variant="outlined"
        p={3}
      />
    </Divider>
  );
};

export default DividerTitle;
