import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import PropTypes from "prop-types";
import iconMap from "./IconMap";

const CategoryItem = ({ category, handleCategoryClick }) => {
  const IconComponent = iconMap[category.category];
  const theme = useTheme();

  return (
    <Box
      key={category._id}
      sx={{
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        flexDirection: "column",
        margin: 1,
        width: { xs: 120, sm: 150 },
        height: { xs: 120, sm: 150 },
      }}
    >
      <IconButton
        onClick={() => handleCategoryClick(category.category)}
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0.7rem",
          boxShadow: `0px 1px 8px #CDD9E1`,
          backgroundColor: "#fff",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "primary.light",
          },
          width: { xs: 80, sm: 100 },
          height: { xs: 80, sm: 100 },
        }}
      >
        {IconComponent ? (
          typeof IconComponent === "function" ? (
            // Material-UI Icons (function components)
            <IconComponent
              sx={{ width: 60, height: 60, color: theme.palette.primary.main }}
            />
          ) : (
            // React Icons (like LiaMaskSolid)
            <IconComponent
              style={{
                width: 60,
                height: 60,
                color: theme.palette.primary.main,
              }}
            />
          )
        ) : (
          <Box>
            <p>Imagen no Disponible</p>
          </Box>
        )}
      </IconButton>
      <Typography variant="body2">
        {category.category} ({category.count || 0})
      </Typography>
    </Box>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryItem;
