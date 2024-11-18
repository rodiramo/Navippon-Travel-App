import PropTypes from "prop-types";
import { useState } from "react";
import { TextField, InputAdornment, useTheme, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const theme = useTheme();
  const [query, setQuery] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div
      className="search-bar"
      style={{
        backgroundColor: theme.palette.primary.mid,
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        justifyContent: "space-between",
        borderRadius: "6px",
      }}
    >
      <div style={{ marginBottom: " 1rem" }}>
        <Typography variant="p">Buscar por Nombre</Typography>
      </div>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ej.: Templo Senso-Ji"
        sx={{
          border: "none",
          backgroundColor: theme.palette.primary.white,
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
