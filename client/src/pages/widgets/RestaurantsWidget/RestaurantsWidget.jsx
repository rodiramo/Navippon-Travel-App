import { Box, Typography } from "@mui/material";

const RestaurantsWidget = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Restaurantes
      </Typography>
      <Typography variant="body1">
        Aquí se mostrarán los restaurantes disponibles.
      </Typography>
    </Box>
  );
};

export default RestaurantsWidget;
