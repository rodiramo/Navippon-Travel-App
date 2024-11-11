import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
/* sections */
import Hero from "./content/Hero.jsx";
import HowItWorks from "./content/HowItWorks.jsx";
import Highlights from "./content/Highlights.jsx";
import Prefectures from "./content/Prefectures.jsx";
import BgShape from "@components/Shapes/BgShape.jsx";

import "@css/HomePage/Home.css";
import CategoryList from "./content/CategoryList.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Hero />
        <BgShape />
        {/* How It Works Section */}
        <HowItWorks />
        {/* Info Section */}
        <CategoryList />
        <Highlights />
        {/* Regions Section */}
        <Prefectures />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
