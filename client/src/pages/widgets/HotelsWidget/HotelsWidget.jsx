import { Box, Typography } from "@mui/material";

const HotelsWidget = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hoteles
      </Typography>
      <Typography variant="body1">
        Aquí se mostrarán los hoteles disponibles.
      </Typography>
    </Box>
  );
};

export default HotelsWidget;
