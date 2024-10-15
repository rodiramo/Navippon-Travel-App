import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import { Box, useTheme } from "@mui/material";
/* sections */
import Hero from "./content/Hero.jsx";
import HowItWorks from "./content/HowItWorks.jsx";
import Categories from "./content/Categories.jsx";
import Highlights from "./content/Highlights.jsx";
import Prefectures from "./content/Prefectures.jsx";
import "@css/HomePage/Home.css";

const HomePage = () => {
  const { palette } = useTheme();
  return (
    <Box>
      <NavBar />
      <Box>
        <Hero />
        <div
          className="bg-shape"
          style={{ background: palette.background.default }}
        ></div>
        {/* How It Works Section */}
        <HowItWorks />
        {/* Categories Section */}
        <Categories />
        {/* Info Section */}
        <Highlights />
        {/* Regions Section */}
        <Prefectures />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
