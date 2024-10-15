import { Box, Typography } from "@mui/material";

const PopularActivities = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          Actividades Populares
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap="1rem"
        ></Box>
      </Box>
      <Box padding="2rem 6%">
        <Typography variant="h4" gutterBottom>
          Lee las Últimas Publicaciones de Nuestra Comunidad
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap="1rem"
        ></Box>
      </Box>
    </Box>
  );
};

export default PopularActivities;
