import React from "react";
import { Box, Typography } from "@mui/material";
import TripForm from "./components/TripForm.jsx";

const CreateTripPage = () => {
  const handleTripCreated = () => {
    console.log("Trip successfully created!");
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agrega un nuevo Itinerario
      </Typography>
      <TripForm onTripCreated={handleTripCreated} />
    </Box>
  );
};

export default CreateTripPage;
