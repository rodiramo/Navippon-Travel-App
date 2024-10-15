import SearchBar from "../../components/SearchBar.jsx";
import "@css/Items/ItemsPage.css";
import { useTheme, Box } from "@mui/material";

const FiltersWidget = () => {
  const theme = useTheme();
  return (
    <Box
      className="filters-widget"
      sx={{
        bgcolor: theme.palette.primary.white,
      }}
    >
      <SearchBar />
      <h2>Filter by:</h2>
    </Box>
  );
};

export default FiltersWidget;
