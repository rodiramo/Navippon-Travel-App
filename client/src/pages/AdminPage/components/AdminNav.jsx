import PropTypes from "prop-types";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { PiUsersFour } from "react-icons/pi";
import { TbWorldPin } from "react-icons/tb";
import { LuStar } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import config from "@config/config.js";
import UserImage from "@components/UserImage.jsx";
import { useSelector } from "react-redux";
import { FaRegComments } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import Users from "../content/screens/users/Users.jsx";
import Experiencies from "../content/screens/experiences/ExperiencesList.jsx";

const AdminNav = ({ userId, picturePath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [userData, setUserData] = useState(null);

  const token = useSelector((state) => state.token);

  const toggleSidebar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${config.API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchUserData();
    }
    if (window.innerWidth >= 1024) setIsMenuOpen(true);
  }, [userId, token]);

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#F4F4F4" }}>
      <Box
        sx={{
          width: isMenuOpen ? 250 : 60,
          backgroundColor: "#0A0330",
          color: "#fff",
          transition: "width 0.3s ease-in-out",
          height: "100%",
          borderRadius: "0rem 2rem 2rem 0rem",
          zIndex: 1000,
          position: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
          <img
            src="/assets/navippon-logo-white.png"
            alt="Logo"
            style={{
              width: isMenuOpen ? "100px" : "60px",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
            marginRight: "-15px",
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              background: "#ff0a51",
              color: "white",
              marginRight: "-16px",
              display: { xs: "block", lg: "none" },
            }}
          >
            {isMenuOpen ? (
              <AiOutlineArrowLeft size={24} />
            ) : (
              <AiOutlineArrowRight size={24} />
            )}
          </IconButton>
        </Box>

        {/* Profile Section */}
        {isMenuOpen && userData && (
          <Box sx={{ padding: 2, display: "flex", alignItems: "center" }}>
            <Box sx={{ marginRight: 2 }}>
              <UserImage image={picturePath} />
            </Box>
            <Box>
              <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {userData.firstName} {userData.lastName}
              </Box>
              <Box sx={{ fontSize: "12px", color: "#ccc" }}>Administrator</Box>
            </Box>
          </Box>
        )}

        <Divider sx={{ margin: 2 }} />

        {/* Menu Items */}
        <List sx={{ padding: 0 }}>
          <ListItem
            button
            onClick={() => setActiveNav("dashboard")}
            sx={{
              backgroundColor:
                activeNav === "dashboard" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <MdOutlineDashboard size={24} />
            {isMenuOpen && (
              <ListItemText primary="Dashboard" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>

          <ListItem
            button
            onClick={() => setActiveNav("experiences")}
            sx={{
              backgroundColor:
                activeNav === "experiences" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <TbWorldPin size={24} />
            {isMenuOpen && (
              <ListItemText primary="Experiencias" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveNav("posts")}
            sx={{
              backgroundColor:
                activeNav === "posts" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <RiNewspaperLine size={24} />
            {isMenuOpen && (
              <ListItemText primary="Posts" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveNav("comments")}
            sx={{
              backgroundColor:
                activeNav === "comments" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <FaRegComments size={24} />
            {isMenuOpen && (
              <ListItemText primary="Commentarios" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveNav("reviews")}
            sx={{
              backgroundColor:
                activeNav === "reviews" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <LuStar size={24} />
            {isMenuOpen && (
              <ListItemText primary="Reseñas" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveNav("categories")}
            sx={{
              backgroundColor:
                activeNav === "categories" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <MdOutlineCategory size={24} />
            {isMenuOpen && (
              <ListItemText primary="Categorías" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveNav("users")}
            sx={{
              backgroundColor:
                activeNav === "users" ? "#FF4A5A" : "transparent",
              "&:hover": { backgroundColor: "#FF4A5A" },
              padding: 2,
            }}
          >
            <PiUsersFour size={24} />
            {isMenuOpen && (
              <ListItemText primary="Usuarios" sx={{ marginLeft: 2 }} />
            )}
          </ListItem>
        </List>

        <Divider sx={{ margin: 2 }} />

        <Box sx={{ marginTop: "auto", padding: 2 }}>
          <Box
            sx={{
              backgroundColor: "#FF4A5A",
              padding: 1,
              borderRadius: 1,
              textAlign: "center",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <HiOutlineMail size={24} />
            {isMenuOpen && <Box sx={{ marginTop: 1 }}>Create New Task</Box>}
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginLeft: isMenuOpen ? 30 : 10, padding: 3, flexGrow: 1 }}>
        {activeNav === "dashboard" && <h1>Welcome to the Admin Dashboard</h1>}
        {activeNav === "comments" && <h1>Comments Section</h1>}
        {activeNav === "experiences" && <Experiencies />}
        {activeNav === "categories" && <h1>Categorías</h1>}
        {activeNav === "posts" && <h1>Posts</h1>}
        {activeNav === "reviews" && <h1>Reviews</h1>}
        {activeNav === "users" && <Users />}
      </Box>
    </Box>
  );
};

AdminNav.propTypes = {
  userId: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
};

export default AdminNav;
