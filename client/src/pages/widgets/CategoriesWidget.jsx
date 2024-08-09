import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { fetchCategoryDetails } from '../../services/services'; 
import config from '../../config'; 

const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryDetails();        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/activities/filtered-category/${categoryName}`);
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Navigate through some of our many categories to find the perfect
        activity for you!
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {categories.map((category) => (
          <Box
            key={category._id}
            sx={{
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              margin: 1,
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
              }}
            >
              <Box
                component="img"
                src={`${config.API_URL}/assets/${category.icon}`}
                alt={category.category}
                sx={{
                  width: 50,
                  height: 50,
                  padding: "0.4rem",
                }}
              />
            </IconButton>
            <Typography variant="body2">
              {category.category} ({category.count || 0})
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

CategoriesWidget.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
};

export default CategoriesWidget;
