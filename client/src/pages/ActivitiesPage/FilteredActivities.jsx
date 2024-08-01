import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const FilteredActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchActivities = async () => {
        const query = new URLSearchParams(location.search);
        const category = query.get('category');
      
        try {
          const response = await fetch(`http://localhost:3333/activities/filtered-activities?category=${category}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch activities: ${response.status} ${response.statusText}. Response: ${errorText}`);
          }
      
          const data = await response.json();
          if (data.message) {
            setError(data.message);
          } else {
            setActivities(data);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          setError(error.message);
        }
      };
      
    
    fetchActivities();
  }, [location.search, token]);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Activities
      </Typography>
      {activities.length === 0 ? (
        <Typography>No activities found for this category.</Typography>
      ) : (
        <List>
          {activities.map((activity) => (
            <ListItem key={activity._id}>
              <ListItemText primary={activity.activityName} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FilteredActivities;
