import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Grid,
} from "@mui/material";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import { Mail, Phone, LocationOn } from "@mui/icons-material";

const ContactPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <NavBar />

      {/* Banner Section with Gradient Overlay */}
      <Box
        sx={{
          height: "40vh",
          backgroundImage: `url('/assets/contact-banner.jpg')`, // Change the path to your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.primary.white,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 139, 0.5)",
          }}
        />
        <Typography variant="h3" fontWeight="bold" position="relative">
          Contáctanos
        </Typography>
      </Box>

      {/* Two Columns for Form and Contact Info */}
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              backgroundColor: theme.palette.background.paper,
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: `0 2px 5px ${theme.palette.grey[300]}`,
            }}
          >
            <Typography
              sx={{
                maxWidth: "600px",
                color: theme.palette.primary.black,
              }}
            >
              Aquí puedes enviarnos tus preguntas o comentarios.
            </Typography>
            <TextField
              label="Nombre"
              variant="outlined"
              required
              sx={{
                backgroundColor: theme.palette.background.grey,
                borderRadius: "8px",
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              sx={{
                backgroundColor: theme.palette.background.grey,
                borderRadius: "8px",
              }}
            />
            <TextField
              label="Mensaje"
              variant="outlined"
              multiline
              rows={4}
              required
              sx={{
                backgroundColor: theme.palette.background.grey,
                borderRadius: "8px",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "20rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Contact Information Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "2rem",
              backgroundColor: theme.palette.background.paper,
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: `0 2px 5px ${theme.palette.grey[300]}`,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
              Información de Contacto
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn
                sx={{
                  marginRight: "0.5rem",
                  color: theme.palette.primary.main,
                }}
              />
              <Typography variant="body1">
                123 Calle Principal, Ciudad
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone
                sx={{
                  marginRight: "0.5rem",
                  color: theme.palette.primary.main,
                }}
              />
              <Typography variant="body1">+123 456 7890</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Mail
                sx={{
                  marginRight: "0.5rem",
                  color: theme.palette.primary.main,
                }}
              />
              <Typography variant="body1">contacto@ejemplo.com</Typography>
            </Box>

            {/* Map Section */}
            <Box
              sx={{
                marginTop: "2rem",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginBottom: "1rem", textAlign: "center" }}
              >
                Encuéntranos aquí
              </Typography>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509262!2d144.9537353153189!3d-37.81627997975107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11c3cd%3A0xa97db59eab1701ee!2sMelbourne%20CBD%2C%20Victoria!5e0!3m2!1sen!2sau!4v1617949256855!5m2!1sen!2sau"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </Box>
  );
};

export default ContactPage;
