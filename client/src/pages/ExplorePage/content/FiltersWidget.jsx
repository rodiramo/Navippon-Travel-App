import SearchBar from "./SearchBar.jsx";
import "@css/Items/ItemsPage.css";
import { useTheme, Box } from "@mui/material";

const FiltersWidget = ({ onSearch }) => {
  const theme = useTheme();
  return (
    <Box
      className="filters-widget"
      sx={{
        bgcolor: theme.palette.primary.white,
      }}
    >
      <SearchBar onSearch={onSearch} />
      <h2>Filter by:</h2>
    </Box>
  );
};

export default FiltersWidget;