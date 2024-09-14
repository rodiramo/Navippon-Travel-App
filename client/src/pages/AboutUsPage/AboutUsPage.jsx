import { Box, Typography, useTheme } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

const AboutPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const primaryMain = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const lightBlue = theme.palette.secondary.light;
  return (
    <Box>
      <NavBar />
      <Box sx={{ position: "relative", height: "400px" }}>
        <Box
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(/assets/bg-about-us.jpg)",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            About Us
          </Typography>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: alt, p: "2rem", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "left", marginLeft: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                mb: "1rem",

                flexDirection: "column",
              }}
            >
              <img
                src="/assets/navippon-icon.png"
                alt="Navippon Logo"
                style={{
                  width: "60px",
                  marginRight: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                What is Navippon?
              </Typography>
            </Box>
            <Typography variant="body1">
              In a world where leisure travel is increasingly popular, we have
              developed an application that offers users the opportunity to{" "}
              <span style={{ color: primaryMain }}>
                discover the perfect destination
              </span>{" "}
              for an unforgettable vacation in Japan. This application is
              designed to provide travelers with a guide.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <img
              src="/assets/what-is-navippon.jpg"
              alt="What is Navippon"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                borderRadius: "2rem",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: "2rem" }}>
          <Typography variant="h5" sx={{ mr: "1rem", fontWeight: "bold" }}>
            - Our Principles -
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-around",
            mb: "2rem",
          }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: "2rem", md: 0 } }}>
            <img
              src="/assets/mission-icon.png"
              alt="Mission Icon"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography variant="h6" sx={{ mt: "1rem", fontWeight: "bold" }}>
              Mission
            </Typography>
            <Typography variant="body1" sx={{ mt: "1rem" }}>
              Our mission at Navippon is to be the{" "}
              <span style={{ color: primaryMain }}>trusted companion</span> for
              travelers who want to explore the richness and beauty of Japan. We
              are committed to providing our users with the tools and
              information they need to plan personalized and meaningful trips.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", mb: { xs: "2rem", md: 0 } }}>
            <img
              src="/assets/values-icon.png"
              alt="Values Icon"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography variant="h6" sx={{ mt: "1rem", fontWeight: "bold" }}>
              Values
            </Typography>
            <Typography variant="body1" sx={{ mt: "1rem" }}>
              We love Japan in all its dimensions and share that passion with
              our users. We strive to promote{" "}
              <span style={{ color: primaryMain }}>
                understanding and respect
              </span>{" "}
              for Japanese culture in every travel experience we offer.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="/assets/vision-icon.png"
              alt="Vision Icon"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography variant="h6" sx={{ mt: "1rem", fontWeight: "bold" }}>
              Vision
            </Typography>
            <Typography variant="body1" sx={{ mt: "1rem" }}>
              Our vision at Navippon is to become the leading platform for
              exploration and travel planning in Japan. We aim to be recognized
              for our <span style={{ color: primaryMain }}>excellence</span> in
              providing travelers with an experience where they can discover the
              authenticity of Japan.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: lightBlue,
            p: "2rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "center", mb: { xs: "2rem", md: 0 } }}>
            <img
              src="/assets/our-community.jpg"
              alt="Our Community"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                borderRadius: "0rem 20rem 20rem 0rem",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography variant="h5" sx={{ mb: "1rem", fontWeight: "bold" }}>
              - Our Community -
            </Typography>
            <Typography variant="body1">
              Our community is fundamental to us. We look forward to seeing it
              grow and flourish with new members passionate about Japan.
              Encouraging discussions, sharing adventures, and connecting with
              lovers of Japanese culture from around the world.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            backgroundColor: primaryLight,
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: "2rem",
            padding: "2rem",
            borderRadius: "20rem 0rem 0rem 20rem",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography variant="h5" sx={{ mb: "1rem", fontWeight: "bold" }}>
              - Why Japan? -
            </Typography>
            <Typography variant="body1">
              Traveling to Japan is a unique experience that immerses you in a
              millennia-old culture, breathtaking landscapes, and cutting-edge
              technology. You will discover the serenity of ancient temples, the
              excitement of modern cities, and delicious Japanese cuisine. Japan
              awaits you with unparalleled wonders!
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <video
              src="/assets/navippon-video.mp4"
              controls
              style={{ width: "100%", height: "auto", maxWidth: "400px" }}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutPage;
