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
  const [visibleCategories, setVisibleCategories] = useState(8);
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
      setVisibleCategories(8);
    } else {
      setShowAll(true);
      setVisibleCategories(categories.length);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-list my-12 p-6" style={{ padding: "0 3rem " }}>
      <h2 className="text-left mb-4 text-3xl font-bold ml-12">
        Navega por categoría
      </h2>

      <div
        className="category-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5rem",
          maxHeight: showAll ? "1000px" : "300px",
          overflow: "hidden",
          opacity: showAll ? 1 : 0.7,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {categories.slice(0, visibleCategories).map((category, index) => (
          <div
            key={index}
            className="category-item p-6 cursor-pointer"
            onClick={() => handleCategoryClick(category.category)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "150px", // Larger width for better alignment
            }}
          >
            <div
              className="icon-container mb-4 shadow-lg rounded-full flex justify-center items-center"
              style={{
                width: "100px", // Larger icon size
                height: "100px", // Larger icon size
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <IconMapping iconName={category.icon} />
            </div>
            <span
              className="text-[#8F9BB3] text-lg font-semibold"
              style={{ fontSize: "1rem", marginTop: "10px" }} // Larger text size
            >
              {category.category}
              {` (${category.count})`}
            </span>
          </div>
        ))}
      </div>

      <div className="load-more-container flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          style={{ color: "#fa5564", fontSize: "1rem" }}
          className="load-more-btn flex items-center px-6 py-3 rounded-lg"
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
