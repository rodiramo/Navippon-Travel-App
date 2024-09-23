import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import logo from "/assets/navippon-logo-white.png";
import { Link } from "react-router-dom"; // Import Link

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      display="flex"
      height="100vh"
      backgroundColor={theme.palette.primary.white}
    >
      {/* Image Section */}
      {isNonMobileScreens && (
        <Box
          flexBasis="40%"
          position="relative"
          sx={{
            borderRadius: "0rem 200rem 200rem 0rem",
            backgroundImage: `url('/assets/login-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            sx={{
              background: `linear-gradient(to bottom, ${theme.palette.background.nav} 0%, rgba(0, 0, 0, 0.0) 100%)`,
              display: "flex",
              borderRadius: "0rem 200rem 200rem 0rem",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "1rem",
            }}
          >
            <Link to="/">
              {" "}
              <img
                src={logo}
                alt="Navippon Logo"
                style={{ width: "7rem", marginTop: "2rem", marginLeft: "2rem" }}
              />
            </Link>
          </Box>
        </Box>
      )}

      {/* Form Section */}
      <Box
        flexBasis={isNonMobileScreens ? "60%" : "100%"}
        backgroundColor={theme.palette.primary.white}
        p="2rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
