import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, CircularProgress, Box } from "@mui/material";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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
        
       
        const details = categoryNames.map(name => categoryMap[name] || { category: name });
        setCategoryDetails(details);
      } catch (error) {
        console.error('Failed to fetch categories', error);
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
      <img
        src={`http://localhost:3333/assets/${activity.coverPath}`}
        alt={activity.activityName}
        style={{ width: "100%", height: "auto", borderRadius: "0.75rem", marginTop: "0.75rem" }}
      />
      <Typography variant="h4" color="primary" mt="1rem">
        {activity.activityName}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        {activity.description}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Categories: {categoryDetails.length ? categoryDetails.map(category => category.category).join(", ") : "No categories"}
      </Typography>  
      <Typography color="text.secondary" mt="0.5rem">
        Prefecture: {activity.prefecture ? activity.prefecture.name : "Loading..."}
      </Typography>
      <Typography color="text.secondary" mt="0.5rem">
        Budget: {activity.budget ? activity.budget.name  : "Loading..."}  {activity.budget ? activity.budget.abbreviation  : "Loading..."}
      </Typography>
      <Footer />
    </Box>
  );
};

export default ActivityDetails;
