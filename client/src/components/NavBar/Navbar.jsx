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
  const location = useLocation();
  const navigate = useNavigate();
  const nav = theme.palette.background.nav;
  const fullName = `${user?.firstName || "Usuario"} ${user?.lastName || ""}`;
  const isLoggedIn = Boolean(_id);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
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
        {isNonMobileScreens && (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: isActiveLink("/")
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
        )}
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
          <Box
            className="fixed top-0 right-0 bottom-0 w-3/4 p-4"
            sx={{
              zIndex: 10000,
              display: "flex",
              flexDirection: "column",
              backgroundColor: nav,
              height: "71vh",
              justifyContent: "space-between",
              alignItems: "flex-end",
              color: theme.palette.primary.main,
            }}
          >
            <IconButton
              onClick={() => setIsMobileMenuOpen(false)}
              sx={{ alignSelf: "flex-end", color: theme.palette.primary.main }}
            >
              <CloseIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{ color: "white", textTransform: "none" }}
              >
                Inicio
              </Button>
            </Link>
            <Link to="/activities" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{ color: "white", textTransform: "none" }}
              >
                Actividades
              </Button>
            </Link>
            <Link to="/posts" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{ color: "white", textTransform: "none" }}
              >
                Blog
              </Button>
            </Link>
            <Link to="/about-us" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{ color: "white", textTransform: "none" }}
              >
                Sobre Nosotros
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Panel de Administración
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Button
                onClick={handleLogout}
                sx={{ color: theme.palette.primary.main }}
              >
                <LogoutIcon sx={{ marginRight: "1rem" }} />
                Cerrar Sesión
              </Button>
            )}
          </Box>
        )}

        {isLoggedIn && (
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
              <Typography>Cerrar Sesión</Typography>
            </MenuItem>
          </Menu>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
