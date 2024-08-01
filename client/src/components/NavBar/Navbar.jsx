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
  const neutralDark = theme.palette.neutral.dark;
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleProfileClick = () => {
    navigate(`/profile/${_id}`);
  };

  const handleMyTripsClick = () => {
    navigate("/my-trips"); // Adjust the route to your "My Trips" page
  };

  return (
    <FlexBetween
      padding="1rem 2rem"  // Adjust padding as needed
      backgroundColor={alt}
      sx={{ width: "100%" }}  // Ensure the navbar takes the full width
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: theme.palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          Navippon
        </Typography>
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <Link to="/discover" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            >
              Discover
            </Typography>
          </Link>  
          <Link to="/activities" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            >
              Activities
            </Typography>
          </Link>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            >
              Blog
            </Typography>
          </Link>
          <Link to="/about-us" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            >
              About Us
            </Typography>
          </Link>

          {/* Conditionally render the Admin Dashboard link */}
          {isAdmin && (
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              >
                Admin Dashboard
              </Typography>
            </Link>
          )}

          <UserProfilePicture userId={_id} picturePath={picturePath} />
          <FormControl variant="standard">
            <Select
              value="My Profile" 
              renderValue={() => (
                <Typography>{fullName}</Typography>  
              )}
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

          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          sx={{ color: neutralDark }}
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
          backgroundColor={theme.palette.background.default}
          p="1rem" 
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            {/* Mode switch in mobile menu */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode
                  sx={{ color: theme.palette.neutral.dark, fontSize: "25px" }}
                />
              )}
            </IconButton>

            {/* Links for Activities, Discover, and About Us in mobile menu */}
            <Link to="/activities" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              >
                Activities
              </Typography>
            </Link>
            <Link to="/discover" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              >
                Discover
              </Typography>
            </Link>
            <Link to="/posts" style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            >
              Blog
            </Typography>
          </Link>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              >
                About Us
              </Typography>
            </Link>
            {isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
                >
                  Admin Dashboard
                </Typography>
              </Link>
            )}
            {/* User profile dropdown in mobile menu */}
            <FormControl variant="standard">
              <Select
                value="My Profile"  
                renderValue={() => (
                  <Typography>{fullName}</Typography> 
                )}
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
