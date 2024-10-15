import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AboutSection = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        mb: "2rem",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left", marginLeft: "2rem" }}>
        <Box sx={{ display: "flex", mb: "1rem", flexDirection: "column" }}>
          <img
            src="/assets/navippon-icon.png"
            alt="Logo de Navippon"
            style={{
              width: "60px",
              marginRight: "0.5rem",
              marginBottom: "1rem",
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            ¿Qué es Navippon?
          </Typography>
        </Box>
        <Typography variant="body1">
          En un mundo donde los viajes de ocio son cada vez más populares, hemos
          desarrollado una aplicación que ofrece a los usuarios la oportunidad
          de{" "}
          <span style={{ color: primaryMain }}>
            descubrir el destino perfecto
          </span>{" "}
          para unas vacaciones inolvidables en Japón.
        </Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <img
          src="/assets/what-is-navippon.jpg"
          alt="Qué es Navippon"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
            borderRadius: "2rem",
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutSection;
