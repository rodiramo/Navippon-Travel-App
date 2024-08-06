import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";
import ActivitySmall from "../widgets/ActivitySmall.jsx";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const FilteredCategoriesPage = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/activities/filtered-category/${categoryName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [categoryName, token]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Box>
        <Box sx={{ marginBottom: 2, marginTop: 3, marginLeft: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} to="/home" underline="hover">
              Home
            </Link>
            <Typography color="text.primary">{categoryName}</Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography variant="h1" gutterBottom>
            Activities in {categoryName}
          </Typography>
          {activities.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              No activity for this category.
            </Typography>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {activities.map((activity) => (
                <Grid item key={activity._id} xs={12} sm={6} md={4}>
                  <ActivitySmall {...activity} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default FilteredCategoriesPage;
