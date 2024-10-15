import { Box, Typography, Button, useTheme } from "@mui/material";
import "@css/Universal.css";
const Highlights = () => {
  const theme = useTheme();
  return (
    <Box
      className="section-flex"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
    >
      <Box flex={1}>
        <img
          src="/assets/home-japan.jpg"
          alt="Templo de Kioto"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "0rem 100rem 100rem 0rem",
          }}
        />
      </Box>
      <Box flex={1} sx={{ ml: { md: 5 }, mr: { md: 5 }, mt: { xs: 2, md: 0 } }}>
        <Typography variant="h4" className="subtitle" gutterBottom>
          Haz de tu viaje un gran éxito con Navippon
        </Typography>
        <p>
          Con Navippon, cada paso de tu viaje se transforma en una experiencia
          inolvidable. Personaliza tu aventura, descubre lugares únicos y crea
          recuerdos que durarán toda la vida. Deja que Navippon sea tu guía
          confiable en el viaje de tus sueños.
        </p>
        <Button
          className="button"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.white,
          }}
        >
          Explora Destinos
        </Button>
      </Box>
    </Box>
  );
};

export default Highlights;
