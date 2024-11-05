import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchCategoryDetails } from "@services/services";
import CategoryCarousel from "./components/CategoryCarousel"; // Adjust the path as necessary

import "./Cate.css";
const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <CategoryCarousel
        categories={categories}
        handleCategoryClick={handleCategoryClick}
      />
    </Box>
  );
};

export default CategoriesWidget;
