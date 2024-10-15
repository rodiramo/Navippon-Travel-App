import { Box, Typography } from "@mui/material";
import PrefecturesWidget from "../../widgets/PrefecturesWidget.jsx";

const Prefectures = () => {
  return (
    <Box padding="2rem 6%">
      <Typography variant="h4" className="subtitle" gutterBottom>
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
