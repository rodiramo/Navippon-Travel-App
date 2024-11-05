import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchCategoryDetails } from "@services/services";
import CategoryItem from "./components/CategoryItem.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <Box className="my-12 p-6">
      <Typography variant="h4" gutterBottom>
        Navega por categoría
      </Typography>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="p-4">
            <CategoryItem
              key={category._id}
              category={category}
              handleCategoryClick={handleCategoryClick}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default CategoriesWidget;
