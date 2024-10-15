import { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, LightMode, DarkMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setMode, setLogout } from "@state/state.js";
import UserProfilePicture from "@pages/widgets/UserProfilePic.jsx";
import useAuth from "@hooks/useAuth.js";
import Logo from "./content/Logo.jsx";
import MenuLinks from "./content/MenuLinks.jsx";
import MobileMenu from "./content/MobileMenu.jsx";
import UserMenu from "./content/UserMenu.jsx";

const NavBar = () => {
  const { isAdmin } = useAuth();
  const userState = useSelector((state) => state.user);
  const user = userState || {};
  const { picturePath, _id } = user;
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const location = useLocation();
  const nav = theme.palette.background.nav;
  const isLoggedIn = Boolean(_id);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: nav,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <Box
        className="p-4"
        sx={{
          display: "flex",
          backgroundColor: nav,
          zIndex: 1000,
          position: "fixed",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Logo Section */}
        <Logo />
        {/* Mobile View */}
        {!isNonMobileScreens && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ color: "white" }}
            >
              {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
            </IconButton>
            {isLoggedIn && (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <UserProfilePicture userId={_id} picturePath={picturePath} />
                </IconButton>
                <IconButton
                  onClick={() => setIsMobileMenuOpen(true)}
                  sx={{ color: "white" }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Box>
        )}

        {/* Centered Links for Desktop View */}
        {isNonMobileScreens && <MenuLinks isActiveLink={isActiveLink} />}
        {/* User Avatar Section for Desktop */}
        {isNonMobileScreens && (
          <Box sx={{ flexShrink: 0 }}>
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ color: "white" }}
            >
              {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
            </IconButton>
            {isLoggedIn && (
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <UserProfilePicture userId={_id} picturePath={picturePath} />
              </IconButton>
            )}
          </Box>
        )}

        {/* Login Button on the Right */}
        {!isLoggedIn && (
          <Box sx={{ flexShrink: 0, ml: "auto" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                className="button-login"
                sx={{
                  color: "white",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "20rem",
                  textTransform: "none",
                }}
              >
                Log in
              </Button>
            </Link>
          </Box>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}

        {isLoggedIn && (
          <UserMenu
            anchorEl={anchorEl}
            handleClose={handleMenuCloseUserMenu}
            fullName={user.fullName}
            isAdmin={isAdmin}
            handleLogout={handleLogout}
          />
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
