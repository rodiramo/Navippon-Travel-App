import { Box } from "@mui/material";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import AboutHeader from "./content/AboutHeader.jsx";
import AboutSection from "./content/AboutSection.jsx";
import PrinciplesSection from "./content/PrinciplesSection.jsx";
import CommunitySection from "./content/CommunitySection.jsx";
import WhyJapanSection from "./content/WhyJapanSection.jsx";

const AboutPage = () => {
  return (
    <Box>
      <NavBar />
      <AboutHeader />
      <AboutSection />
      <PrinciplesSection />
      <CommunitySection />
      <WhyJapanSection />
      <Footer />
    </Box>
  );
};

export default AboutPage;
