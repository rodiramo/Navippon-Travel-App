import { Box, Typography, useMediaQuery } from "@mui/material";

const HowItWorks = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const steps = [
    {
      imgSrc: "/assets/find.png",
      alt: "Encuentra",
      title: "Filtra según tus preferencias",
      description:
        "Descubre la magia de Japón adaptada a tus gustos. Nuestra aplicación te permite filtrar atracciones turísticas por categorías.",
    },
    {
      imgSrc: "/assets/connect.png",
      alt: "Conectar",
      title: "Conéctate con Personas",
      description:
        "Hay muchas personas interesadas en la cultura japonesa y en viajar a Japón, conéctate con ellas y sigue lo que están publicando.",
    },
    {
      imgSrc: "/assets/itinerary.png",
      alt: "Planificar",
      title: "Planifica tu itinerario",
      description:
        "Organiza tu itinerario personalizado, guarda tus lugares favoritos y crea tu plan de viaje para disfrutar Japón al máximo.",
    },
  ];

  return (
    <Box padding="2rem 6%" textAlign="center">
      <Typography variant="h4" className="subtitle" gutterBottom>
        ¿Cómo Funciona?
      </Typography>
      <p>Navippon te ayuda a planificar tu viaje</p>
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="1rem"
        sx={{ mt: 2 }}
        justifyContent="center"
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            flexBasis={isNonMobileScreens ? "33%" : "100%"}
            sx={{ textAlign: "center" }}
          >
            <img
              src={step.imgSrc}
              alt={step.alt}
              style={{ width: "250px", margin: "1rem auto" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {step.title}
            </Typography>
            <Typography
              sx={{ width: isNonMobileScreens ? "50%" : "80%", margin: "auto" }}
            >
              {step.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HowItWorks;
