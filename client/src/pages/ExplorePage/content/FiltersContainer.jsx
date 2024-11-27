import PropTypes from "prop-types";
import Filters from "../components/Filters.jsx";
import SearchBar from "../components/SearchBar.jsx";
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
      <Filters />
    </Box>
  );
};

FiltersWidget.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default FiltersWidget;
