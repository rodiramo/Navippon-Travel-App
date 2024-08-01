import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CategoriesWidget from "../widgets/CategoriesWidget.jsx";
import PrefecturesWidget from "../widgets/PrefecturesWidget.jsx";
import BudgetWidget from "../widgets/BudgetWidget.jsx";
import { Box} from "@mui/material";


const HomePage = () => {

  return (
    <Box>
      <NavBar />
      <Box p={2}> 
    <CategoriesWidget />
    <PrefecturesWidget />
    <BudgetWidget/>
  </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
