import PropTypes from "prop-types"; // Import PropTypes
import Slider from "react-slick";
import CategoryItem from "./CategoryItem"; // Ensure this path is correct
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryCarousel = ({ categories, handleCategoryClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one column of categories
    slidesToScroll: 1,
    rows: 3, // Display items in 3 rows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 3, // Adjust rows as necessary
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2, // Adjust for smaller screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1, // Display one row for very small screens
        },
      },
    ],
  };

  return (
    <div className="category-carousel my-12 p-6">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="p-4">
            <CategoryItem
              category={category}
              handleCategoryClick={handleCategoryClick}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

CategoryCarousel.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired, // or whatever fields are required
      icon: PropTypes.string.isRequired,
      count: PropTypes.number,
    })
  ).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryCarousel;
