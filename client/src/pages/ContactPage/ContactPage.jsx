import { Box, Typography } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
const ContactPage = () => {
  return (
    <Box>
      <NavBar></NavBar>
      <Typography variant="h4" gutterBottom>
        Contactanos
      </Typography>
      <Typography variant="body1">
        Aquí se mostrará la pag de contacto.
      </Typography>
      <Footer></Footer>
    </Box>
  );
};

export default ContactPage;
