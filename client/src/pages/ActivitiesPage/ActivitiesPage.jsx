import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ActivitiesWidget from "../widgets/ActivitiesWidget.jsx";


import { Box} from "@mui/material";
const ActivitiesPage = () => {
 
  return (
    <Box>
      <NavBar />
      <h1>Hello</h1>
      <ActivitiesWidget  />
      <Footer />
    </Box>
  );
};

export default ActivitiesPage;
