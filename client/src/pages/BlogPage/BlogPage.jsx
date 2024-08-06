import { useEffect, useState } from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";

const BlogPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [picturePath, setPicturePath] = useState(null);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchUserPicture = async () => {
      try {
        const response = await fetch(`http://localhost:3333/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await response.json();
        setPicturePath(userData.picturePath);
      } catch (err) {
        console.error("Failed to fetch user picture", err);
      }
    };

    fetchUserPicture();
  }, [userId, token]);

  return (
    <Box>
      <NavBar />{" "}
      <Typography
        variant="h1"
        sx={{ textAlign: "center", fontWeight: "bold", marginTop: 2 }}
        gutterBottom
      >
        The Community Posts
      </Typography>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={userId} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default BlogPage;
