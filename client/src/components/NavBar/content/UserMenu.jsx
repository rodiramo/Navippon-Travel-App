import PropTypes from "prop-types";
import { Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Person, TravelExplore, Favorite, Logout } from "@mui/icons-material";
import { useAuth } from "@hooks/useAuth.js";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const UserMenu = ({ anchorEl, handleClose, handleLogout }) => {
  const { isAdmin } = useAuth();
  const userState = useSelector((state) => state.user);
  const user = userState || {};
  const { _id } = user;
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "white",
          borderRadius: "0.5rem",
          boxShadow: (theme) => theme.shadows[5],
          mt: 1,
          minWidth: "150px",
        },
      }}
    >
      <MenuItem
        component={Link}
        to={`/profile/${_id}`}
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
        <Logout sx={{ marginRight: "1rem" }} />
        <Typography>Cerrar Sesión</Typography>
      </MenuItem>
    </Menu>
  );
};

UserMenu.propTypes = {
  anchorEl: PropTypes.string,
  handleClose: PropTypes.string,
  fullName: PropTypes.string,
  isAdmin: PropTypes.string,
  handleLogout: PropTypes.string,
};
export default UserMenu;
