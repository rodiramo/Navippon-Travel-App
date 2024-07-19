import { Box, useTheme } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: alt,
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000, 
        padding: "1rem 0",
      }}
    >
    
      <BottomNavigation sx={{ justifyContent: "center" }}>
        <BottomNavigationAction
          label="Facebook"
          icon={<FacebookIcon />}
          onClick={() => window.open("https://www.facebook.com", "_blank")}
        />
        <BottomNavigationAction
          label="Twitter"
          icon={<TwitterIcon />}
          onClick={() => window.open("https://www.twitter.com", "_blank")}
        />
        <BottomNavigationAction
          label="Instagram"
          icon={<InstagramIcon />}
          onClick={() => window.open("https://www.instagram.com", "_blank")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
