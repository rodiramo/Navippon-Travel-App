import { Box, Typography, useTheme } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/NavBar/Navbar.jsx";

const AboutPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <NavBar />
     
      <Box sx={{ backgroundColor: alt, p: "2rem", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: "1rem" }}>
          What is Navippon?
        </Typography>
        <Typography variant="body1" sx={{ mb: "2rem" }}>
          In a world where leisure travel is increasingly popular, we have developed an application that offers users the opportunity to discover the perfect destination for an unforgettable vacation in Japan. This application is designed to provide travelers with a guide.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: "2rem" }}>
          {/* Replace {img} with your image component */}
          <Typography variant="h5" sx={{ mr: "1rem" }}>
            - Our Principles -
          </Typography>
          {/* Replace {icon} with your icon component */}
        </Box>

        <Typography variant="body1" sx={{ mb: "1rem" }}>
          <strong>Mission:</strong> Our mission at Navippon is to be the trusted companion for travelers who want to explore the richness and beauty of Japan. We are committed to providing our users with the tools and information they need to plan personalized and meaningful trips.
        </Typography>
        <Typography variant="body1" sx={{ mb: "1rem" }}>
          <strong>Values:</strong> We love Japan in all its dimensions and share that passion with our users. We strive to promote understanding and respect for Japanese culture in every travel experience we offer.
        </Typography>
        <Typography variant="body1" sx={{ mb: "1rem" }}>
          <strong>Vision:</strong> Our vision at Navippon is to become the leading platform for exploration and travel planning in Japan. We aim to be recognized for our excellence in providing travelers with an experience where they can discover the authenticity of Japan.
        </Typography>

        <Typography variant="h5" sx={{ mb: "1rem" }}>
          - Our Community -
        </Typography>
        <Typography variant="body1" sx={{ mb: "2rem" }}>
          Our community is fundamental to us. We look forward to seeing it grow and flourish with new members passionate about Japan. Encouraging discussions, sharing adventures, and connecting with lovers of Japanese culture from around the world.
        </Typography>

        <Typography variant="body1" sx={{ mb: "2rem" }}>
          - Why Japan? -
        </Typography>
        <Typography variant="body1" sx={{ mb: "2rem" }}>
          Traveling to Japan is a unique experience that immerses you in a millennia-old culture, breathtaking landscapes, and cutting-edge technology. You will discover the serenity of ancient temples, the excitement of modern cities, and delicious Japanese cuisine. Japan awaits you with unparalleled wonders!
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutPage;
