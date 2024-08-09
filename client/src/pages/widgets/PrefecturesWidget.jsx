import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from '../../config.js';

const PrefecturesWidget = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch(`${config.API_URL}/prefectures`);
        if (!response.ok) {
          throw new Error("Failed to fetch prefectures");
        }
        const data = await response.json();
        setPrefectures(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPrefectures();
  }, []);

  const handleClick = (prefectureId) => {
    navigate(`/activities/filtered-prefecture/${prefectureId}`);
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Find your favorite attractions and restaurants in the region that
        catches your attention.
      </Typography>
      <List
        sx={{
          display: "flex",
          padding: 0,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {prefectures.map((prefecture) => (
          <ListItem
            button
            key={prefecture._id}
            onClick={() => handleClick(prefecture._id)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 1,
              width: 150,
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={`${config.API_URL}/assets/${prefecture.image}`}
              alt={prefecture.name}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                marginBottom: 1,
              }}
            />
            <ListItemText
              primary={prefecture.name}
              secondary={`Activities: ${prefecture.activityCount}`}
              sx={{ textAlign: "center" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PrefecturesWidget;
