import { Box, Typography, useTheme } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";

const Footer = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: alt,
        bottom: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation sx={{ justifyContent: "center" }}>
        <Typography>Navippon</Typography>
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
