// src/pages/BlogPage/BlogPage.jsx
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx"; 
import MyPostWidget from "../widgets/MyPostWidget.jsx";


const BlogPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const { picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
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
          <PostsWidget userId={_id} />
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
