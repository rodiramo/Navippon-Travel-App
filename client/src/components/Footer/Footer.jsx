import { Box, Typography, useTheme, Link as MuiLink } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";

const Footer = () => {
  const theme = useTheme();
  const nav = theme.palette.background.nav;
  const main = theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: nav,
        bottom:0,
        zIndex: 1000,
        paddingLeft: { xs: "2rem", sm: "3rem", md: "5rem" },
        paddingRight: { xs: "2rem", sm: "3rem", md: "5rem" },
        paddingTop: "7rem",
        paddingBottom: "7rem",
        textAlign: "center",
        color: "white"
      }}
    >
      <BottomNavigation 
        sx={{ 
          justifyContent: { xs: "center", md: "space-around" }, 
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: nav, 
          boxShadow: "none" 
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: { xs: 2, md: 0 } }}>
          <MuiLink href="/home" sx={{ display: "flex", alignItems: "center", flexDirection: "column", textDecoration: "none", color: "inherit" }}>
            <img src="/assets/navippon-logo-white.png" alt="Navippon Logo" style={{ width: "50px" }} />
            <Typography variant="h6" sx={{ fontWeight: "bolder", marginTop: 1 }}>Navippon</Typography>
          </MuiLink>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: { xs: 2, md: 0 } }}>
          <Typography variant="body1" sx={{ color: main }}>Company</Typography>
          <MuiLink href="/about-us" sx={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body2">About Us</Typography>
          </MuiLink>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: { xs: 2, md: 0 } }}>
          <Typography variant="body1" sx={{ color: main }}>More</Typography>
          <MuiLink href="/activities" sx={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body2">Activities</Typography>
          </MuiLink>
          <MuiLink href="/blog" sx={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body2">Blog</Typography>
          </MuiLink>
        </Box>
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
