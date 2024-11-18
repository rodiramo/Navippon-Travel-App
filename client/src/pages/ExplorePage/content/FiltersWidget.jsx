import PropTypes from "prop-types";
import SearchBar from "./SearchBar.jsx";
import "@css/Items/ItemsPage.css";
import { useTheme, Box, Typography } from "@mui/material";

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
      <Typography variant="p">Filtrar por:</Typography>
    </Box>
  );
};

FiltersWidget.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default FiltersWidget;
