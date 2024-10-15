import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../../config/config.js";

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
            key={prefecture._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 1,
              width: 150,
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={`${config.API_URL}/assets/${prefecture.image}`}
              alt={prefecture.name}
              sx={{
                width: 150,
                height: 120,
                borderRadius: "50%",
                marginBottom: 1,
                transition: "opacity 0.3s ease",
                opacity: 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleClick(prefecture._id)}
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
