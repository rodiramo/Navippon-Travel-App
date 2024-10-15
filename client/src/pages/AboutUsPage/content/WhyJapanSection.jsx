import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const WhyJapanSection = () => {
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: primaryLight,
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        mb: "2rem",
        padding: "2rem",
        borderRadius: "20rem 0rem 0rem 20rem",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left" }}>
        <Typography variant="h5" sx={{ mb: "1rem", fontWeight: "bold" }}>
          ¿Por qué Japón?
        </Typography>
        <Typography variant="body1">
          Viajar a Japón es una experiencia única que te sumerge en una cultura
          milenaria, paisajes impresionantes y tecnología de punta.
        </Typography>
      </Box>
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <video
          src="/assets/navippon-video.mp4"
          controls
          style={{ width: "100%", height: "auto", maxWidth: "400px" }}
        />
      </Box>
    </Box>
  );
};

export default WhyJapanSection;
