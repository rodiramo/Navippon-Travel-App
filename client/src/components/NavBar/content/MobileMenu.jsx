import PropTypes from "prop-types";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "@state/state.js";
import { useAuth } from "@hooks/useAuth.js";

const MobileMenu = ({ onClose }) => {
  const { isAdmin } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  const nav = theme.palette.background.nav;

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <Box
      sx={{
        backgroundColor: nav,
        justifyContent: "flex-start",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ alignSelf: "flex-end", color: "primary.main" }}
      >
        <CloseIcon />
      </IconButton>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="text"
          sx={{
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",
          }}
        >
          Inicio
        </Button>
      </Link>
      <Link to="/experiences" style={{ textDecoration: "none" }}>
        <Button
          variant="text"
          sx={{
            color: "white",
            justifyContent: "flex-start",
            textTransform: "none",
          }}
        >
          Explorar
        </Button>
      </Link>
      <Link to="/posts" style={{ textDecoration: "none" }}>
        <Button
          variant="text"
          sx={{
            color: "white",
            justifyContent: "flex-start",
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
            justifyContent: "flex-start",
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
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          >
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileMenu;
