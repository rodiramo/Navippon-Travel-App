import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CommunitySection = () => {
  const theme = useTheme();
  const lightBlue = theme.palette.secondary.light;

  return (
    <Box
      sx={{
        backgroundColor: lightBlue,
        borderRadius: "8px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        mb: "2rem",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "center", mb: { xs: "2rem", md: 0 } }}>
        <img
          src="/assets/our-community.jpg"
          alt="Nuestra Comunidad"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
            borderRadius: "0rem 20rem 20rem 0rem",
          }}
        />
      </Box>
      <Box sx={{ flex: 1, textAlign: "left" }}>
        <Typography variant="h5" sx={{ mb: "1rem", fontWeight: "bold" }}>
          Nuestra Comunidad
        </Typography>
        <Typography variant="body1">
          Nuestra comunidad es fundamental para nosotros. Esperamos verla crecer
          y florecer con nuevos miembros apasionados por Japón.
        </Typography>
      </Box>
    </Box>
  );
};

export default CommunitySection;
