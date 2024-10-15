import { Box, Typography } from "@mui/material";

const AboutHeader = () => {
  return (
    <Box sx={{ position: "relative", height: "400px" }}>
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(/assets/bg-about-us.jpg)",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Sobre Nosotros
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutHeader;
