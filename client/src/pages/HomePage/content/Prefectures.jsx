import { Box, Typography } from "@mui/material";
import PrefecturesWidget from "@widgets/PrefecturesWidget.jsx";

const Prefectures = () => {
  return (
    <Box
      sx={{
        height: "20vh",
        marginTop: "4rem",
        display: "flex",
        marginBottom: "10rem",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <h2 className="text-left mb-4 text-3xl font-bold ml-8">
        Navega por Región
      </h2>

      <Typography style={{ marginLeft: "2rem" }}>
        Encuentra tus atractivos y restaurantes favoritos en la región que más
        te llame la atención.
      </Typography>
      <PrefecturesWidget />
    </Box>
  );
};

export default Prefectures;
