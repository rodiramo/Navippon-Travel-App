import { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode,
  DarkMode,
  TravelExplore,
  Favorite,
  Person,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setMode, setLogout } from "../../state/state.js";
import UserProfilePicture from "../../pages/widgets/UserProfilePic.jsx";
import useAuth from "../../hooks/useAuth.js";
import logo from "/assets/navippon-logo-white.png";

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
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook to navigate programmatically
  const nav = theme.palette.background.nav;
  const fullName = `${user?.firstName || "Usuario"} ${user?.lastName || ""}`;

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Utility function to determine if a link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav style={{ backgroundColor: nav, zIndex: 1000 }}>
      <Box
        className="max-w-screen-xl flex items-center justify-between mx-auto p-4"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo Section */}
        <Box sx={{ flexShrink: 0 }}>
          <Link
            to="/home"
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
        {/* Centered Links */}
        {isNonMobileScreens ? (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: isActiveLink("/home")
                    ? theme.palette.primary.main
                    : "white",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  textTransform: "none",
                }}
              >
                Inicio
              </Button>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  color: isActiveLink("/about-us")
                    ? theme.palette.primary.main
                    : "white",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  textTransform: "none",
                }}
              >
                Nosotros
              </Button>
            </Link>
            <Link to="/activities" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  color: isActiveLink("/activities")
                    ? theme.palette.primary.main
                    : "white",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  textTransform: "none",
                }}
              >
                Explora
              </Button>
            </Link>
            <Link to="/posts" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: isActiveLink("/posts")
                    ? theme.palette.primary.main
                    : "white",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  textTransform: "none",
                }}
              >
                Blog
              </Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: isActiveLink("/contact")
                    ? theme.palette.primary.main
                    : "white",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  textTransform: "none",
                }}
              >
                Contacto
              </Button>
            </Link>
          </Box>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuOpen(true)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {/* User Avatar Section */}
        <Box sx={{ flexShrink: 0 }}>
          {isNonMobileScreens && (
            <>
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ color: "white" }}
              >
                {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
              </IconButton>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <UserProfilePicture userId={_id} picturePath={picturePath} />
              </IconButton>
            </>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                bgcolor: theme.palette.primary.white,
                borderRadius: "0.5rem",
                boxShadow: theme.shadows[5],
                mt: 1,
                minWidth: "150px",
              },
            }}
          >
            <MenuItem sx={{ display: "flex", alignItems: "center" }}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/profile/${_id}`)}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person sx={{ marginRight: "1rem" }} />
              <Typography>Mi Perfil</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/trips"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TravelExplore sx={{ marginRight: "1rem" }} />
              <Typography>Mis Viajes</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to="/favorites"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Favorite sx={{ marginRight: "1rem" }} />
              <Typography>Favoritos</Typography>
            </MenuItem>
            {isAdmin && (
              <MenuItem
                component={Link}
                to="/admin"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AdminPanelSettingsIcon sx={{ marginRight: "1rem" }} />
                <Typography>Panel de Administración</Typography>
              </MenuItem>
            )}
            <MenuItem
              onClick={handleLogout}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LogoutIcon sx={{ marginRight: "1rem" }} />
              <Typography>Salir</Typography>
            </MenuItem>
          </Menu>
        </Box>
        {isMobileMenuOpen && (
          <Box
            className="fixed top-0 right-0 bottom-0 w-3/4 bg-gray-800 text-white p-4"
            sx={{
              zIndex: 10000,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <IconButton
              onClick={() => setIsMobileMenuOpen(false)}
              sx={{ alignSelf: "flex-end", color: "white" }}
            >
              <CloseIcon />
            </IconButton>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Inicio
              </Button>
            </Link>
            <Link to="/activities" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Actividades
              </Button>
            </Link>
            <Link to="/posts" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Blog
              </Button>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Sobre Nosotros
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  sx={{
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Panel de Administración
                </Button>
              </Link>
            )}
            <Button onClick={() => dispatch(setMode())} sx={{ color: "white" }}>
              {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
            </Button>
            <Button onClick={handleLogout} sx={{ color: "white" }}>
              Salir
            </Button>
          </Box>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
