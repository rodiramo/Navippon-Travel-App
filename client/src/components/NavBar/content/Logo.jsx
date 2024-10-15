import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import logo from "/assets/navippon-logo-white.png";

const Logo = () => {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo Navippon"
          style={{ height: "40px", marginRight: "0.5rem" }}
        />
        <Typography
          fontFamily="SifonnPro"
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 1.75rem)"
          color="white"
          sx={{ textTransform: "none" }}
        >
          Navippon
        </Typography>
      </Link>
    </Box>
  );
};

export default Logo;
