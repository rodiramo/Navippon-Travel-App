import { Box, Typography } from "@mui/material";
import TripsWidget from "../../TripPage/TripsWidget.jsx";

const TripsSection = () => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <Typography variant="h2">Mis Viajes</Typography>
      <TripsWidget />
    </Box>
  );
};

export default TripsSection;
