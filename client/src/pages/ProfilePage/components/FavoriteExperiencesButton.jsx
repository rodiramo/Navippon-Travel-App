import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FavoriteExperiencesButton = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/favorites");
  };

  return (
    <Box
      flexBasis="42%"
      mt="2rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        sx={{
          width: "150px", // Diameter of the round element
          height: "150px",
          borderRadius: "50%",
          backgroundImage: "url('/assets/bg-home2.jpg')", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleNavigation}
      />
      <Typography
        variant="h6"
        mt={2}
        textAlign="center"
        onClick={handleNavigation}
        sx={{ cursor: "pointer" }}
      >
        Experiencias Favoritas
      </Typography>
    </Box>
  );
};

export default FavoriteExperiencesButton;
