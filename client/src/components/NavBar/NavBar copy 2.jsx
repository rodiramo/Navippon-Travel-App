import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/state.js";
import { useNavigate, Link } from "react-router-dom";
import FlexBetween from "../FlexBetween.jsx";
import UserProfilePicture from "../../pages/widgets/UserProfilePic.jsx";
import useAuth from "../../hooks/useAuth.js";
import logo from "/assets/navippon-logo-white.png";

const NavBar = () => {
  const { isAdmin } = useAuth();
  const userState = useSelector((state) => state.user);
  const user = userState || {};
  const { picturePath, _id } = user;
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const nav = theme.palette.background.nav;
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleProfileClick = () => {
    navigate(`/profile/${_id}`);
  };

  const handleMyTripsClick = () => {
    navigate("/trips");
  };

  return (
    <FlexBetween
      padding="1rem 2rem"
      backgroundColor={nav}
      sx={{ width: "100%" }}
    >
      <FlexBetween gap="1.75rem">
        <Box
          display="flex"
          alignItems="center"
          onClick={() => navigate("/home")}
          sx={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Navippon logo"
            style={{ width: "40px", marginRight: "0.5rem" }}
          />
          <Typography
            fontFamily="SifonnPro"
            fontWeight="bold"
            fontSize="clamp(0.75rem, 1.5rem, 1.75rem)"
            color="white"
            sx={{
              "&:hover": {
                color: theme.palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            Navippon
          </Typography>
        </Box>
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {" "}
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
            >
              Home
            </Typography>
          </Link>
          <Link to="/activities" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
            >
              Activities
            </Typography>
          </Link>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
            >
              Blog
            </Typography>
          </Link>
          <Link to="/about-us" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
            >
              About Us
            </Typography>
          </Link>
          {isAdmin && (
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
              >
                Admin Dashboard
              </Typography>
            </Link>
          )}
          <UserProfilePicture userId={_id} picturePath={picturePath} />
          <FormControl variant="standard">
            <Select
              value="my-profile"
              renderValue={() => <Typography>{fullName}</Typography>}
              sx={{
                backgroundColor: neutralLight,
                width: "210px",
                borderRadius: "30rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                  borderRadius: "30rem",
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value="my-profile" onClick={handleProfileClick}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ textTransform: "none", width: "100%" }}
                >
                  <Typography>My Profile</Typography>
                </Button>
              </MenuItem>
              <MenuItem value="my-trips" onClick={handleMyTripsClick}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ textTransform: "none", width: "100%" }}
                >
                  <Typography>My Trips</Typography>
                </Button>
              </MenuItem>
              <MenuItem value="logout" onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px", color: "white" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: "white" }} />
            )}
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          sx={{ color: "white" }}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          top="0"
          right="0"
          bottom="0"
          width="100%"
          zIndex="10"
          backgroundColor={theme.palette.background.nav}
          p="1rem"
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close sx={{ fontSize: "25px", color: "white" }} />
            </IconButton>
          </Box>
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "light" ? (
                <DarkMode sx={{ fontSize: "25px", color: "white" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: "white" }} />
              )}
            </IconButton>

            <Link to="/activities" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
              >
                Activities
              </Typography>
            </Link>

            <Link to="/posts" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
              >
                Blog
              </Typography>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
              >
                About Us
              </Typography>
            </Link>
            {isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.primary.light, cursor: "pointer" }}
                >
                  Admin Dashboard
                </Typography>
              </Link>
            )}
            <FormControl variant="standard">
              <Select
                value="My Profile"
                renderValue={() => <Typography>{fullName}</Typography>}
                sx={{
                  backgroundColor: neutralLight,
                  width: "200px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Button
                    variant="text"
                    color="inherit"
                    sx={{ textTransform: "none", width: "100%" }}
                  >
                    <Typography>My Profile</Typography>
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMyTripsClick}>
                  <Button
                    variant="text"
                    color="inherit"
                    sx={{ textTransform: "none", width: "100%" }}
                  >
                    <Typography>My Trips</Typography>
                  </Button>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
