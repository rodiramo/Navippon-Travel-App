import PropTypes from "prop-types";
import { Menu, MenuItem, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiTrip } from "react-icons/bi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "@hooks/useAuth.js";

const UserMenu = ({ anchorEl, handleClose, handleLogout }) => {
  const { isAdmin } = useAuth();
  const theme = useTheme(); // Get the theme
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
        <FaRegUser
          style={{ marginRight: "1rem", color: theme.palette.primary.main }} // Using style prop for react-icons
        />
        <Typography>Mi Perfil</Typography>
      </MenuItem>
      <MenuItem
        component={Link}
        to="/trips"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <BiTrip
          style={{ marginRight: "1rem", color: theme.palette.primary.main }} // Same here
        />
        <Typography>Mis Viajes</Typography>
      </MenuItem>
      <MenuItem
        component={Link}
        to="/favorites"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <MdFavoriteBorder
          style={{ marginRight: "1rem", color: theme.palette.primary.main }} // And here
        />
        <Typography>Favoritos</Typography>
      </MenuItem>
      {isAdmin && (
        <MenuItem
          component={Link}
          to="/admin"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MdOutlineAdminPanelSettings
            style={{ marginRight: "1rem", color: theme.palette.primary.main }} // And here
          />
          <Typography>Panel de Administración</Typography>
        </MenuItem>
      )}
      <MenuItem
        onClick={handleLogout}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <RiLogoutBoxLine
          style={{ marginRight: "1rem", color: theme.palette.primary.main }} // Finally here
        />
        <Typography>Cerrar Sesión</Typography>
      </MenuItem>
    </Menu>
  );
};

UserMenu.propTypes = {
  anchorEl: PropTypes.object.isRequired, // Corrected type to 'object'
  handleClose: PropTypes.func.isRequired, // Corrected type to 'func'
  handleLogout: PropTypes.func.isRequired, // Corrected type to 'func'
};

export default UserMenu;
