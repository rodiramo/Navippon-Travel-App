import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const CategoriesWidget = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3333/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/activities/filtered-activities?category=${category}`);
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {categories.map((category) => (
          <ListItem
            key={category._id}
            button
            onClick={() => handleCategoryClick(category.category)}
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
              src={`http://localhost:3333/assets/${category.icon}`}
              alt={category.category}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                marginBottom: 1,
              }}
            />
            <ListItemText
              primary={category.category}
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesWidget;
