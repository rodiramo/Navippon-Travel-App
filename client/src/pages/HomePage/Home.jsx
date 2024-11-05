import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
/* sections */
import Hero from "./content/Hero.jsx";
import HowItWorks from "./content/HowItWorks.jsx";
import Categories from "./content/Categories.jsx";
import Highlights from "./content/Highlights.jsx";
import Prefectures from "./content/Prefectures.jsx";
import BgShape from "@components/BgShape.jsx";

import "@css/HomePage/Home.css";
import { Category } from "@mui/icons-material";
import CategoryCarousel from "./content/CategoryCarrusel.jsx";

const HomePage = () => {
  return (

    <Box className="flex flex-col min-h-screen">
      <NavBar />
      <Box className="flex-grow">

        <Hero />
        <BgShape />
        {/* How It Works Section */}
        <HowItWorks />
        {/* Categories Section */}
        <Categories />
        {/* Info Section */}
        <CategoryCarousel />
        <Highlights />
        {/* Regions Section */}
        <Prefectures />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;