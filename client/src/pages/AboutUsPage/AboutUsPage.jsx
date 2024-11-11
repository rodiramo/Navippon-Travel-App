import { Box } from "@mui/material";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import Header from "./content/Header.jsx";
import AboutSection from "./content/AboutSection.jsx";
import PrinciplesSection from "./content/PrinciplesSection.jsx";
import CommunitySection from "./content/CommunitySection.jsx";
import WhyJapanSection from "./content/WhyJapanSection.jsx";
import BgShape from "@components/Shapes/BgShape.jsx";
const AboutPage = () => {
  return (
    <Box>
      <NavBar />
      <Header />
      <BgShape />
      <AboutSection />
      <WhyJapanSection />
      <PrinciplesSection />
      <CommunitySection />
      <Footer />
    </Box>
  );
};

export default AboutPage;
