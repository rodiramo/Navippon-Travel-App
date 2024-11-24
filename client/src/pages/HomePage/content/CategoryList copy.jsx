// CategoryList.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Typography } from "@mui/material";
import { fetchCategoryDetails } from "@services/services";
import IconMapping from "@widgets/CategoriesWidget/components/IconMapping";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryList = () => {
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
    navigate(`/experiences/filtered-category/${categoryName}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-list my-12" style={{ padding: "4rem 0rem" }}>
      <h2 className="text-left mb-4 text-3xl font-bold ml-12">
        Navega por categoría
      </h2>

      <div>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              key={index}
              className="cursor-pointer p-5"
              onClick={() => handleCategoryClick(category.category)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "150px",
              }}
            >
              <div
                className="shadow-lg rounded-full flex justify-center items-center"
                style={{
                  width: "100px",
                  height: "100px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <IconMapping iconName={category.icon} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography style={{ fontSize: "1rem", textAlign: "center" }}>
                  {category.category}
                </Typography>
                <span
                  style={{ fontSize: "0.9rem" }}
                >{` (${category.count})`}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryList;
