import PropTypes from "prop-types";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <h2>Search by Name:</h2>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name"
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

// Prop validation
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
