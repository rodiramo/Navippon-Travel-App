import { Box } from "@mui/material";
import FavoriteActivities from "@widgets/ActivitiesWidget/FavoriteActivities.jsx";

const FavoritesSection = () => {
  return (
    <Box flexBasis="42%" mt="2rem">
      <Box m="2rem 0" />
      <h2>My Favorites</h2>
      <FavoriteActivities />
    </Box>
  );
};

export default FavoritesSection;
