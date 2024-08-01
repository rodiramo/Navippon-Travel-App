import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PrefecturesWidget = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleClick = (prefectureId) => {
    navigate(`/activities/filtered-activities?prefecture=${prefectureId}`);
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Prefectures
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {prefectures.map((prefecture) => (
          <ListItem
            button
            key={prefecture._id}
            onClick={() => handleClick(prefecture._id)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'auto',
              margin: 1,
            }}
          >
            <Box
              component="img"
              src={`http://localhost:3333/assets/${prefecture.image}`}
              alt={prefecture.name}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                marginBottom: 1,
              }}
            />
            <ListItemText
              primary={prefecture.name}
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PrefecturesWidget;
