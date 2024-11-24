import { Box } from "@mui/material";
import FavoriteExperiences from "@widgets/ExperiencesWidget/Favorites.jsx";

const FavoritesSection = () => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <h2>My Favorites</h2>
      <FavoriteExperiences />
    </Box>
  );
};

export default FavoritesSection;
