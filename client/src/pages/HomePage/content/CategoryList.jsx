// CategoryList.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategoryDetails } from "@services/services";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import IconMapping from "../../widgets/CategoriesWidget/components/IconMapping";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(5);
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

  const handleLoadMore = () => {
    if (showAll) {
      setShowAll(false);
      setVisibleCategories(6);
    } else {
      setShowAll(true);
      setVisibleCategories(categories.length);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-list my-12 p-6">
      <h2 className="text-left mb-4 text-2xl">Navega por categoría</h2>

      <div
        className="category-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          maxHeight: showAll ? "1000px" : "300px",
          overflow: "hidden",
          opacity: showAll ? 1 : 0.7,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {categories.slice(0, visibleCategories).map((category, index) => (
          <div
            key={index}
            className="category-item p-4 cursor-pointer"
            onClick={() => handleCategoryClick(category.category)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              className="icon-container mb-4 shadow-lg rounded-full flex justify-center items-center"
              style={{
                width: "80px",
                height: "80px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconMapping iconName={category.icon} />
            </div>
            <span className="text-[#8F9BB3]">
              {category.category}
              {` (${category.count})`}
            </span>
          </div>
        ))}
      </div>

      <div className="load-more-container flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          style={{ color: "#fa5564" }}
          className="load-more-btn flex items-center px-4 py-2 rounded-lg"
        >
          {showAll ? (
            <>
              <span>Ver Menos Categorías</span>
              <FaArrowUp className="ml-2" />
            </>
          ) : (
            <>
              <span>Cargar Más Categorías</span>
              <FaArrowDown className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
