import { Box, Typography } from "@mui/material";

const PrincipleCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mb: { xs: "2rem", md: 0 },
      }}
    >
      {" "}
      <Box sx={{ display: "flex", justifyContent: "center", mb: "2rem" }}>
        <Typography variant="h5" sx={{ mr: "1rem", fontWeight: "bold" }}>
          Nuestros Principios
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          mb: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: { xs: "2rem", md: 0 },
          }}
        >
          <img
            src="/assets/mission-icon.png"
            alt="Ícono de Misión"
            style={{ width: "50px", height: "50px" }}
          />
          <Typography variant="h6" sx={{ mt: "1rem", fontWeight: "bold" }}>
            Misión
          </Typography>
          <Typography variant="body1" sx={{ mt: "1rem" }}>
            Nuestra misión en Navippon es ser el{" "}
            <span>compañero confiable</span> para los viajeros que desean
            explorar la riqueza y belleza de Japón. Estamos comprometidos a
            proporcionar a nuestros usuarios las herramientas y la información
            que necesitan para planificar viajes personalizados y
            significativos.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: { xs: "2rem", md: 0 },
          }}
        >
          <img
            src="/assets/values-icon.png"
            alt="Ícono de Valores"
            style={{ width: "50px", height: "50px" }}
          />
          <Typography variant="h6" sx={{ mt: "1rem", fontWeight: "bold" }}>
            Valores
          </Typography>
          <Typography variant="body1" sx={{ mt: "1rem" }}>
            Amamos Japón en todas sus dimensiones y compartimos esa pasión con
            nuestros usuarios. Nos esforzamos por promover el{" "}
            <span>entendimiento y respeto</span> por la cultura japonesa en cada
            experiencia de viaje que ofrecemos.
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/vision-icon.png"
            alt="Ícono de Visión"
            style={{ width: "50px", height: "50px" }}
          />
          <Typography variant="h6" sx={{ mt: "1rem", fontWeight: "bold" }}>
            Visión
          </Typography>
          <Typography variant="body1" sx={{ mt: "1rem" }}>
            Nuestra visión en Navippon es convertirnos en la plataforma líder
            para la exploración y planificación de viajes en Japón. Aspiramos a
            ser reconocidos por nuestra <span>excelencia</span>
            en proporcionar a los viajeros una experiencia donde puedan
            descubrir la autenticidad de Japón.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PrincipleCard;
