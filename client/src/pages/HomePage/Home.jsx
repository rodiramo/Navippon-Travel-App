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

const HomePage = () => {
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-content">
        <Hero />
        <BgShape />
        {/* How It Works Section */}
        <HowItWorks />
        {/* Categories Section */}
        <Categories />
        {/* Info Section */}
        <Highlights />
        {/* Regions Section */}
        <Prefectures />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
