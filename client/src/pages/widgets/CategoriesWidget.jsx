import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <Box
              component="img"
              src={`http://localhost:3333/assets/${category.icon}`}
              alt={category.category}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 2,
              }}
            />
            <ListItemText primary={category.category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesWidget;
