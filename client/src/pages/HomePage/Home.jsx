import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CategoriesWidget from "../widgets/CategoriesWidget.jsx";
import PrefecturesWidget from "../widgets/PrefecturesWidget.jsx";
import heroImage from "/assets/home-bg.jpg";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <NavBar />
      <Box>
        <Box
          sx={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "20vh",
            borderRadius: "0rem 0rem 5rem 5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h1"
            sx={{ textAlign: "center", fontWeight: "bold" }}
            gutterBottom
          >
            Explore Japan Your Way
          </Typography>
        </Box>

        {/* How It Works Section */}
        <Box padding="2rem 6%">
          <Typography variant="h4" gutterBottom>
            How It Works
          </Typography>
          <Box
            display="flex"
            flexDirection={isNonMobileScreens ? "row" : "column"}
            gap="1rem"
          >
            <Box flexBasis={isNonMobileScreens ? "33%" : "100%"}>
              <img
                src="/assets/find.png"
                alt="Navippon Logo"
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">
                Filter according to your preferences
              </Typography>
              <Typography>
                Discover the magic of Japan tailored to your tastes. Our app
                allows you to filter tourist attractions by categories.
              </Typography>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "33%" : "100%"}>
              {" "}
              <img
                src="/assets/connect.png"
                alt="Navippon Logo"
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">Connect with People</Typography>
              <Typography>
                There are many people that are interested in Japanese culture
                and travelling to Japan, connect with them and follow what they
                are posting about.
              </Typography>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "33%" : "100%"}>
              {" "}
              <img
                src="/assets/itinerary.png"
                alt="Navippon Logo"
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">Plan your itinerary</Typography>
              <Typography>
                Organize your personalized itinerary, save your favorite places,
                and create your travel plan to enjoy Japan to the fullest.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Categories Section */}
        <Box padding="2rem 6%" textAlign="center">
          <Typography variant="h4" gutterBottom>
            Explore by Category
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="1rem"
          >
            <CategoriesWidget />
          </Box>
        </Box>

        {/* Regions Section */}
        <Box padding="2rem 6%">
          <Typography variant="h4" gutterBottom>
            Explore Japan by Region
          </Typography>
          <PrefecturesWidget />
        </Box>

        {/* Popular Activities Section 
        <Box padding="2rem 6%">
          <Typography variant="h4" gutterBottom>
            Popular Activities
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="1rem"
          ></Box>
        </Box>

        <Box padding="2rem 6%">
          <Typography variant="h4" gutterBottom>
            Read Our Communities Latests Posts
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap="1rem"
          ></Box>
        </Box>*/}
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
