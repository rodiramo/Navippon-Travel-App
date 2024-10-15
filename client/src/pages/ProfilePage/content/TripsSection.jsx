import { Box } from "@mui/material";
import TripsWidget from "../../TripPage/TripsWidget.jsx";

const TripsSection = () => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <h2>My Trips</h2>
      <TripsWidget />
    </Box>
  );
};

export default TripsSection;
