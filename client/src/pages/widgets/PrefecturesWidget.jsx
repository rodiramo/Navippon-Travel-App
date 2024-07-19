import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const PrefecturesWidget = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch("http://localhost:3333/prefectures");
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

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        prefectures
      </Typography>
      <List>
        {prefectures.map((prefecture) => (
          <ListItem key={prefecture._id}>
            <Box
              component="img"
              src={`http://localhost:3333/assets/${prefecture.image}`}
              alt={prefecture.name}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 2,
              }}
            />
            <ListItemText primary={prefecture.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PrefecturesWidget;
