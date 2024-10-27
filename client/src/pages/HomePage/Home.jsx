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
import { Category } from "@mui/icons-material";
import CategoryCarousel from "./content/CategoryCarrusel.jsx";

const HomePage = () => {
  const { palette } = useTheme();
  return (
    <Box className="flex flex-col min-h-screen">
      <NavBar />
      <Box className="flex-grow">
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
        <CategoryCarousel />
        <Highlights />
        {/* Regions Section */}
        <Prefectures />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;