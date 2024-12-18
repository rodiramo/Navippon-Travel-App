import { Box, Typography } from "@mui/material";
import TripsWidget from "../../TripPage/TripsWidget.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const TripsSection = () => {
  const { userId } = useParams();
  const loggedInUserId = useSelector((state) => state.user._id);
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <Typography variant="h2">
        {loggedInUserId === userId ? "Mis Viajes" : `Viajes`}
      </Typography>
      <TripsWidget />
    </Box>
  );
};

export default TripsSection;
