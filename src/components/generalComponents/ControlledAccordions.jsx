import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

const ControlledAccordions = ({ children, title, className = null }) => {
  const theme = useTheme();
  return (
    <>
      <Accordion my={5} className={className}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "whitesmoke" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          p={3}
          sx={{
            backgroundColor: theme.palette.warning.dark,
          }}
        >
          <Typography variant="h6" textAlign="center">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default ControlledAccordions;
