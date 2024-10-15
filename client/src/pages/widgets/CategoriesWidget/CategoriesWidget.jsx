import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, IconButton, Button } from "@mui/material";
import PropTypes from "prop-types";
import { fetchCategoryDetails } from "@services/services";
import config from "@config/config.js";

const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryDetails();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/activities/filtered-category/${categoryName}`);
  };

  const handleShowMore = () => {
    setShowAll(true);
    setVisibleCount(categories.length);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setVisibleCount(10);
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Box display="flex" flexWrap="wrap">
        {categories.slice(0, visibleCount).map((category) => (
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
              <Box
                component="img"
                src={`${config.API_URL}/assets/${category.icon}`}
                alt={category.category}
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        {showAll ? (
          <Button
            variant="outlined"
            onClick={handleShowLess}
            sx={{ borderRadius: 20 }}
          >
            Mostrar menos Categorías
          </Button>
        ) : (
          visibleCount < categories.length && (
            <Button
              variant="outlined"
              onClick={handleShowMore}
              sx={{ borderRadius: 20 }}
            >
              Mostrar más Categorías
            </Button>
          )
        )}
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
