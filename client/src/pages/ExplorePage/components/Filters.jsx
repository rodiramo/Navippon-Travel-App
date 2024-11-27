import { useTheme, Typography, Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchCategoryDetails } from "@services/services.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Filters = () => {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Price range state
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryDetails();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategories();
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const toggleSubcategories = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Handle price range changes
  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    if (type === "min") {
      setMinPrice(value);
    } else if (type === "max") {
      setMaxPrice(value);
    }
  };

  // Optional: Price range validation
  const validatePriceRange = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (min > max && max !== "") {
      return "Max price cannot be less than Min price";
    }
    return "";
  };

  return (
    <Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "6px",
        }}
      >
        {/* Price Range Section */}
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "4px",
            border: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Typography variant="body2">Rango de Precio</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <TextField
              label="Mínimo"
              value={minPrice}
              onChange={(e) => handlePriceChange(e, "min")}
              type="number"
              variant="outlined"
              size="small"
              style={{ width: "48%" }}
            />
            <TextField
              label="Máximo"
              value={maxPrice}
              onChange={(e) => handlePriceChange(e, "max")}
              type="number"
              variant="outlined"
              size="small"
              style={{ width: "48%" }}
            />
          </div>
          {validatePriceRange() && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "0.5rem" }}
            >
              {validatePriceRange()}
            </Typography>
          )}
        </div>

        <div
          style={{
            padding: "1rem ",
            borderRadius: "4px 4px 0 0px",
            backgroundColor: theme.palette.primary.mid,
          }}
        >
          <Typography variant="body1">Categorías</Typography>
        </div>

        {/* Categories Section */}
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem 0",
            borderRadius: " 0 0px 4px 4px",
            border: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                padding: "0rem 1rem ",
                display: "flex",
                fontSize: "0.85rem",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  value={category.category}
                  checked={selectedCategories.includes(category.category)}
                  onChange={() => handleCheckboxChange(category.category)}
                  style={{
                    appearance: "none",
                    border: selectedCategories.includes(category.category)
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid lightblue",
                    borderRadius: "4px",
                    width: "16px",
                    height: "16px",
                    outline: "none",
                    cursor: "pointer",
                    marginRight: "8px",
                    backgroundColor: selectedCategories.includes(
                      category.category
                    )
                      ? theme.palette.primary.main
                      : theme.palette.primary.white,
                    transition:
                      "border-color 0.3s ease, background-color 0.3s ease",
                  }}
                />
                {category.category}
              </label>
              <div>
                {category.subcategories && category.subcategories.length > 0 && (
                  <Button
                    variant="text"
                    onClick={() => toggleSubcategories(category.category)}
                    size="small"
                    style={{
                      marginLeft: "0.5rem",
                      fontSize: "0.70rem",
                      textTransform: "none",
                    }}
                    startIcon={
                      expandedCategories[category.category] ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )
                    }
                  >
                    {expandedCategories[category.category]
                      ? "Esconder Sub Categorías"
                      : "Mostrar Sub Categorías"}
                  </Button>
                )}

                {expandedCategories[category.category] && (
                  <div
                    style={{
                      marginLeft: "-4rem",
                      marginTop: "0.5rem",
                      fontSize: "0.70rem",
                    }}
                  >
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id}>
                        <label
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="checkbox"
                            value={subcategory.name}
                            checked={selectedCategories.includes(
                              subcategory.name
                            )}
                            onChange={() =>
                              handleCheckboxChange(subcategory.name)
                            }
                            style={{
                              appearance: "none",
                              border: selectedCategories.includes(
                                subcategory.name
                              )
                                ? `2px solid ${theme.palette.primary.main}`
                                : "2px solid lightblue",
                              borderRadius: "4px",
                              width: "16px",
                              height: "16px",
                              outline: "none",
                              cursor: "pointer",
                              marginRight: "8px",
                              backgroundColor: selectedCategories.includes(
                                subcategory.name
                              )
                                ? theme.palette.primary.main
                                : theme.palette.primary.white,
                              transition:
                                "border-color 0.3s ease, background-color 0.3s ease",
                            }}
                          />
                          {subcategory.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Filters;
