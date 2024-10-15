import { Box, Typography } from "@mui/material";
import PrefecturesWidget from "../../widgets/PrefecturesWidget.jsx";

const Prefectures = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        className="subtitle"
        gutterBottom
        sx={{ marginLeft: "2rem" }}
      >
        Navega Japón por Región
      </Typography>
      <p style={{ marginLeft: "2rem" }}>
        Encuentra tus atractivos y restaurantes favoritos en la región que más
        te llame la atención.
      </p>
      <PrefecturesWidget />
    </Box>
  );
};

export default Prefectures;
