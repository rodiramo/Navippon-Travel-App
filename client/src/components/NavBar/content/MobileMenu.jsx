import PropType from "prop-types";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "@state/state.js";
import { useAuth } from "@hooks/useAuth.js";

const MobileMenu = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  const nav = theme.palette.background.nav;
  const handleLogout = () => {
    dispatch(setLogout());
  };

  if (!isOpen) return null;

  return (
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
        color: "white",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ alignSelf: "flex-end", color: "primary.main" }}
      >
        <CloseIcon />
      </IconButton>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="text" sx={{ color: "white", textTransform: "none" }}>
          Inicio
        </Button>
      </Link>
      <Link to="/activities" style={{ textDecoration: "none" }}>
        <Button variant="text" sx={{ color: "white", textTransform: "none" }}>
          Actividades
        </Button>
      </Link>
      <Link to="/posts" style={{ textDecoration: "none" }}>
        <Button variant="text" sx={{ color: "white", textTransform: "none" }}>
          Blog
        </Button>
      </Link>
      <Link to="/about-us" style={{ textDecoration: "none" }}>
        <Button variant="text" sx={{ color: "white", textTransform: "none" }}>
          Sobre Nosotros
        </Button>
      </Link>
      {isAdmin && (
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <Button variant="text" sx={{ color: "white", textTransform: "none" }}>
            Panel de Administración
          </Button>
        </Link>
      )}
      <Button onClick={handleLogout} sx={{ color: "primary.main" }}>
        Cerrar Sesión
      </Button>
    </Box>
  );
};

MobileMenu.propTypes = {
  isOpen: PropType.string,
  onClose: PropType.string,
};
export default MobileMenu;
