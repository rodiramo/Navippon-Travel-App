import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "@components/NavBar/NavBar.jsx";
import Footer from "@components/Footer/Footer.jsx";
import BreadcrumbBack from "@components/BreadcrumbBack.jsx";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import config from "@config/config.js";
import { getFavorites } from "@services/index/favorite";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoritesData = await getFavorites(token);
        setFavorites(favoritesData || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleViewDetails = (experienceId) => {
    navigate(`/experiences/${experienceId}`);
  };

  if (loading) {
    return <Typography variant="h6">Loading favorites...</Typography>;
  }

  return (
    <div id="body">
      <NavBar />
      <BreadcrumbBack />
      <div style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          My Favorite Experiences
        </Typography>
        {favorites.length === 0 ? (
          <Typography variant="body1">
            You don't have any favorite experiences yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((favorite) => {
              const { experienceId } = favorite;
              return (
                <Grid item xs={12} sm={6} md={4} key={experienceId._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={experienceId.name}
                      height="140"
                      image={`${config.API_URL}/assets/${experienceId.image}`} // Adjust image path
                    />
                    <CardContent>
                      <Typography variant="h6">{experienceId.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {experienceId.description}
                      </Typography>
                      <Typography variant="body1" color="primary">
                        ${experienceId.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(experienceId._id)}
                        style={{ marginTop: "1rem" }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
