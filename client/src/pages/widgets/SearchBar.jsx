import { Box } from "@mui/material";
import "@css/SearchBar.css";

const SearchBar = () => {
  return (
    <Box sx={{}}>
      <Box
        display="flex"
        className="bg-searchbar"
        flexWrap="wrap"
        justifyContent="center"
      >
        <div className="space">
          <input type="text" placeholder="¿Qué estás buscando?" />
        </div>{" "}
        <div className="space">
          <button className="button-search">Buscar</button>
        </div>
      </Box>
    </Box>
  );
};

export default SearchBar;
