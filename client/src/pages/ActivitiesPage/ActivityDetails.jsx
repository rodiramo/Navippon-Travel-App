import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  CircularProgress,
  Box,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./ActivityDetail.css";

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`http://localhost:3333/activities/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setActivity(data);

        fetchCategoryDetails(data.categories);
      } catch (error) {
        console.error("Error fetching activity:", error.message);
      }
    };

    const fetchCategoryDetails = async (categoryNames) => {
      try {
        const response = await fetch(`http://localhost:3333/categories`);
        const categories = await response.json();

        const categoryMap = categories.reduce((acc, category) => {
          acc[category.category] = category;
          return acc;
        }, {});

        const details = categoryNames.map(
          (name) => categoryMap[name] || { category: name }
        );
        setCategoryDetails(details);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchActivity();
  }, [id, token]);

  if (!activity) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <NavBar />
      <Box className="activity-detail breadcrumbs-container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/home">
            Home
          </Link>
          <Link color="inherit" href="/activities">
            Activities
          </Link>
          <Typography color="textPrimary">{activity.activityName}</Typography>
        </Breadcrumbs>
      </Box>
      <Box className="activity-header">
        <img
          src={`http://localhost:3333/assets/${activity.coverPath}`}
          alt={activity.activityName}
        />
        <Typography variant="h4" color="primary" className="activity-title">
          {activity.activityName}
        </Typography>
      </Box>
      <Box className="activity-body">
        <Typography className="activity-description">
          {activity.description}
        </Typography>
        <Box className="activity-categories">
          {categoryDetails.map((category) => (
            <ListItem
              key={category._id}
              button
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "auto",
                margin: 1,
              }}
            >
              <Box
                component="img"
                src={`http://localhost:3333/assets/${category.icon}`}
                alt={category.category}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  marginBottom: 1,
                }}
              />
              <ListItemText
                primary={category.category}
                sx={{ textAlign: "center" }}
              />
            </ListItem>
          ))}
        </Box>
        <Typography className="activity-location">
          Prefecture:{" "}
          {activity.prefecture ? activity.prefecture.name : "Loading..."}
        </Typography>
        <Typography className="activity-location">
          Budget: {activity.budget ? activity.budget.name : "Loading..."}{" "}
          {activity.budget ? activity.budget.abbreviation : "Loading..."}
        </Typography>
      </Box>
      <Footer />
    </Box>
  );
};

export default ActivityDetails;
