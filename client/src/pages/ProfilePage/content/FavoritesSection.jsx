import { Box, Typography } from "@mui/material";
import FavoriteExperiencesButton from "../components/FavoriteExperiencesButton.jsx";
import FavoriteBlogsButton from "../components/FavoriteBlogsButton.jsx";
const FavoritesSection = () => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <Typography variant="h2">Mis Favoritos</Typography>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <FavoriteExperiencesButton />
        <FavoriteBlogsButton />
      </div>
    </Box>
  );
};

export default FavoritesSection;
