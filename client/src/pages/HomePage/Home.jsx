import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CategoriesWidget from "../widgets/CategoriesWidget.jsx";
import PrefecturesWidget from "../widgets/PrefecturesWidget.jsx";
import heroImage from "/assets/home-bg.jpeg";
import "./Home.css";
import SearchBar from "../widgets/SearchBar.jsx";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  return (
    <Box>
      <NavBar />
      <Box>
        <Box
          sx={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{ textAlign: "center", fontWeight: "bold" }}
            gutterBottom
          >
            Navega Japón a Tu Manera
          </Typography>
          <SearchBar />
        </Box>
        <div
          className="bg-shape"
          style={{ background: palette.background.default }}
        ></div>
        {/* How It Works Section */}
        <Box padding="2rem 6%">
          <Typography variant="h4" className="subtitle" gutterBottom>
            ¿Cómo Funciona?
          </Typography>
          <p>Navippon te ayuda a planificar tu viaje</p>
          <Box
            display="flex"
            flexDirection={isNonMobileScreens ? "row" : "column"}
            gap="1rem"
          >
            <Box flexBasis={isNonMobileScreens ? "33%" : "100%"}>
              <img
                src="/assets/find.png"
                alt="Encuentra"
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">
                Filtra según tus preferencias
              </Typography>
              <Typography>
                Descubre la magia de Japón adaptada a tus gustos. Nuestra
                aplicación te permite filtrar atracciones turísticas por
                categorías.
              </Typography>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "33%" : "100%"}>
              <img
                src="/assets/connect.png"
                alt="Conectar"
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">Conéctate con Personas</Typography>
              <Typography>
                Hay muchas personas interesadas en la cultura japonesa y en
                viajar a Japón, conéctate con ellas y sigue lo que están
                publicando.
              </Typography>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "33%" : "100%"}>
              <img
                src="/assets/itinerary.png"
                alt="Planificar"
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">Planifica tu itinerario</Typography>
              <Typography>
                Organiza tu itinerario personalizado, guarda tus lugares
                favoritos y crea tu plan de viaje para disfrutar Japón al
                máximo.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Categories Section */}
        <Box padding="2rem 6%" textAlign="center">
          <Typography variant="h4" className="subtitle" gutterBottom>
            Navega por Categoría
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="1rem"
          >
            <CategoriesWidget />
          </Box>
        </Box>

        {/* Another Section */}
        <Box className="section-flex">
          <Box>
            <img src="/assets/home-japan.jpg" alt="Templo de Kioto" />
          </Box>
          <Box>
            <Typography variant="h4" className="subtitle" gutterBottom>
              Haz de tu viaje un gran éxito con Navippon{" "}
            </Typography>
            <p>
              Con Navippon, cada paso de tu viaje se transforma en una
              experiencia inolvidable. Personaliza tu aventura, descubre lugares
              únicos y crea recuerdos que durarán toda la vida. Deja que
              Navippon sea tu guía confiable en el viaje de tus sueños.
            </p>
          </Box>
        </Box>
        {/* Regions Section */}
        <Box padding="2rem 6%">
          <Typography variant="h4" className="subtitle" gutterBottom>
            Navega Japón por Región
          </Typography>
          <p>
            Encuentra tus atractivos y restaurantes favoritos en la región que
            más te llame la atención.
          </p>
          <PrefecturesWidget />
        </Box>

        {/* Popular Activities Section 
        <Box padding="2rem 6%">
          <Typography variant="h4" gutterBottom>
            Actividades Populares
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="1rem"
          ></Box>
        </Box>

        <Box padding="2rem 6%">
          <Typography variant="h4" gutterBottom>
            Lee las Últimas Publicaciones de Nuestra Comunidad
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="1rem"
          ></Box>
        </Box>*/}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
