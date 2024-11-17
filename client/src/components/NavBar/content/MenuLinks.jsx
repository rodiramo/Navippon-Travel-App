import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuLinks = ({ isActiveLink }) => {
  const links = [
    { path: "/", label: "Inicio" },
    { path: "/about-us", label: "Nosotros" },
    { path: "/experiences", label: "Explora" },
    { path: "/posts", label: "Blog" },
    { path: "/contact", label: "Contacto" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      {links.map(({ path, label }) => (
        <Link
          to={path}
          style={{ textDecoration: "none", justifyContent: "flex-start" }}
          key={path}
        >
          <Button
            variant="text"
            sx={{
              color: isActiveLink(path) ? "primary.main" : "white",
              "&:hover": {
                color: "primary.main",
              },
              justifyContent: "flex-start",
              textTransform: "none",
            }}
          >
            {label}
          </Button>
        </Link>
      ))}
    </Box>
  );
};

MenuLinks.propTypes = {
  isActiveLink: PropTypes.func.isRequired,
};

export default MenuLinks;
