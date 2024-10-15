import { Box, Typography } from "@mui/material";
import CategoriesWidget from "@widgets/CategoriesWidget/CategoriesWidget.jsx";

const Categories = () => {
  return (
    <Box padding="2rem 6%" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        className="subtitle"
        sx={{ marginLeft: "2rem" }}
        gutterBottom
      >
        Navega por Categoría
      </Typography>
      <Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap="1rem">
        <CategoriesWidget />
      </Box>
    </Box>
  );
};

export default Categories;
