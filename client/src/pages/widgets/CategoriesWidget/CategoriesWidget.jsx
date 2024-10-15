import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { fetchCategoryDetails } from "@services/services";
import CategoryItem from "./components/CategoryItem.jsx";

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
          <CategoryItem
            key={category._id}
            category={category}
            handleCategoryClick={handleCategoryClick}
          />
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

export default CategoriesWidget;
