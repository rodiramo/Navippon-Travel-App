import { IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import iconMap from "./IconMap";

const CategoryItem = ({ category, handleCategoryClick }) => {
  const IconComponent = iconMap[category.category];
  const theme = useTheme();

  return (
    <div key={category._id} className="p-4">
      <div className="flex flex-col items-center text-center">
        <IconButton
          onClick={() => handleCategoryClick(category.category)}
          className="icon-container mb-4 bg-white shadow-lg rounded-full flex justify-center items-center"
          sx={{ width: "80px", height: "80px" }} // Adjusting size for the container
        >
          {IconComponent ? (
            typeof IconComponent === "function" ? (
              // Material-UI Icons (function components)
              <IconComponent
                sx={{
                  width: 60,
                  height: 60,
                  color: theme.palette.primary.main,
                }}
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
            <Typography variant="caption">No Icon</Typography>
          )}
        </IconButton>

        {/* Category Title */}
        <Typography variant="body2" className="text-[#8F9BB3]">
          {category.category} ({category.count || 0})
        </Typography>
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired, // Assuming icon is passed as a component
    count: PropTypes.number,
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryItem;
