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

const NavBar = () => {
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

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
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
          {/* User profile picture and dropdown */}
          <UserProfilePicture userId={_id} picturePath={picturePath} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
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
              <MenuItem value={fullName}>
                <Button
                  onClick={handleProfileClick}
                  variant="text"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  <Typography>{fullName}</Typography>
                </Button>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
    {/* Mode switch */}
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
  
      {/* Mobile menu */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={theme.palette.background.default}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
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
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              >
                About Us
              </Typography>
            </Link>
            {/* User profile dropdown in mobile menu */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
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
                <MenuItem value={fullName}>
                  <Button
                    onClick={handleProfileClick}
                    variant="text"
                    color="inherit"
                    sx={{ textTransform: "none" }}
                  >
                    <Typography>{fullName}</Typography>
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
