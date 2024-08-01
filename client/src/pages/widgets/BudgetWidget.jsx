import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const PrefecturesWidget = () => {
  const [budgets, setBudget] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch("http://localhost:3333/budget");
        if (!response.ok) {
          throw new Error("Failed to fetch budget");
        }
        const data = await response.json();
        setBudget(data);
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
        budgets
      </Typography>
      <List>
        {budgets.map((budget) => (
          <ListItem key={budget._id}>
           <ListItemText primary={budget.name} />
            <ListItemText primary={budget.abbreviation} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PrefecturesWidget;
