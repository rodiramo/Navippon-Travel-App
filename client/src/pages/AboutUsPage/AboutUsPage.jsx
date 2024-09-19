import { Box, Typography, useTheme } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

const AboutPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const primaryMain = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const lightBlue = theme.palette.secondary.light;
  return (
    <Box>
      <NavBar />
      <Box sx={{ position: "relative", height: "400px" }}>
        <Box
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(/assets/bg-about-us.jpg)",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Sobre Nosotros
          </Typography>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: alt, p: "2rem", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "left", marginLeft: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                mb: "1rem",
                flexDirection: "column",
              }}
            >
              <img
                src="/assets/navippon-icon.png"
                alt="Logo de Navippon"
                style={{
                  width: "60px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                ¿Qué es Navippon?
              </Typography>
            </Box>
            <Typography variant="body1">
              En un mundo donde los viajes de ocio son cada vez más populares,
              hemos desarrollado una aplicación que ofrece a los usuarios la
              oportunidad de{" "}
              <span style={{ color: primaryMain }}>
                descubrir el destino perfecto
              </span>{" "}
              para unas vacaciones inolvidables en Japón. Esta aplicación está
              diseñada para proporcionar a los viajeros una guía.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <img
              src="/assets/what-is-navippon.jpg"
              alt="Qué es Navippon"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                borderRadius: "2rem",
              }}
            />
          </Box>
        </Box>

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
              <span style={{ color: primaryMain }}>compañero confiable</span>{" "}
              para los viajeros que desean explorar la riqueza y belleza de
              Japón. Estamos comprometidos a proporcionar a nuestros usuarios
              las herramientas y la información que necesitan para planificar
              viajes personalizados y significativos.
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
              <span style={{ color: primaryMain }}>
                entendimiento y respeto
              </span>{" "}
              por la cultura japonesa en cada experiencia de viaje que
              ofrecemos.
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
              para la exploración y planificación de viajes en Japón. Aspiramos
              a ser reconocidos por nuestra{" "}
              <span style={{ color: primaryMain }}>excelencia</span>
              en proporcionar a los viajeros una experiencia donde puedan
              descubrir la autenticidad de Japón.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: lightBlue,
            p: "2rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "center", mb: { xs: "2rem", md: 0 } }}>
            <img
              src="/assets/our-community.jpg"
              alt="Nuestra Comunidad"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                borderRadius: "0rem 20rem 20rem 0rem",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography variant="h5" sx={{ mb: "1rem", fontWeight: "bold" }}>
              Nuestra Comunidad
            </Typography>
            <Typography variant="body1">
              Nuestra comunidad es fundamental para nosotros. Esperamos verla
              crecer y florecer con nuevos miembros apasionados por Japón.
              Fomentando discusiones, compartiendo aventuras y conectando con
              amantes de la cultura japonesa de todo el mundo.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            backgroundColor: primaryLight,
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "2rem",
            padding: "2rem",
            borderRadius: "20rem 0rem 0rem 20rem",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography variant="h5" sx={{ mb: "1rem", fontWeight: "bold" }}>
              ¿Por qué Japón?
            </Typography>
            <Typography variant="body1">
              Viajar a Japón es una experiencia única que te sumerge en una
              cultura milenaria, paisajes impresionantes y tecnología de punta.
              Descubrirás la serenidad de los templos antiguos, la emoción de
              las ciudades modernas y la deliciosa gastronomía japonesa. ¡Japón
              te espera con maravillas inigualables!
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <video
              src="/assets/navippon-video.mp4"
              controls
              style={{ width: "100%", height: "auto", maxWidth: "400px" }}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutPage;
