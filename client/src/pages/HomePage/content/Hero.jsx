import { Box, Typography } from "@mui/material";
import SearchBar from "../../widgets/SearchBar.jsx";
import heroImage from "/assets/home-bg.jpeg";

const Hero = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{ textAlign: "center", fontWeight: "bold" }}
        gutterBottom
      >
        Navega Japón a Tu Manera
      </Typography>
      <SearchBar />
    </Box>
  );
};

export default Hero;
