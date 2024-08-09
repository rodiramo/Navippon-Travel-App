import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";
import config from "../config.js";

const TripForm = ({ onTripCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [budgetOptions, setBudgetOptions] = useState([]);
  const [prefectureOptions, setPrefectureOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchBudgetOptions = async () => {
      try {
        const response = await fetch(`${config.API_URL}/budget`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setBudgetOptions(data);
      } catch (err) {
        console.error("Failed to fetch budget options:", err.message);
      }
    };

    const fetchPrefectureOptions = async () => {
      try {
        const response = await fetch(`${config.API_URL}/prefectures`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPrefectureOptions(data);
      } catch (err) {
        console.error("Failed to fetch prefecture options:", err.message);
      }
    };

    const fetchCategoryOptions = async () => {
      try {
        const response = await fetch(`${config.API_URL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCategoryOptions(data);
      } catch (err) {
        console.error("Failed to fetch category options:", err.message);
      }
    };

    fetchBudgetOptions();
    fetchPrefectureOptions();
    fetchCategoryOptions();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUserId) {
      setError("User ID is missing");
      return;
    }

    try {
      const response = await fetch(`${config.API_URL}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          title,
          description,
          startDate,
          endDate,
          prefecture,
          categories,
          budget,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create trip");
      }

      setSuccess("Trip created successfully!");
      setError("");
      onTripCreated();
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Create a Trip</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        type="date"
        label="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        type="date"
        label="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <FormControl required>
        <InputLabel>Prefecture</InputLabel>
        <Select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          required
        >
          {prefectureOptions.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required>
        <InputLabel>Budget</InputLabel>
        <Select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        >
          {budgetOptions.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      <Button type="submit" variant="contained">
        Create Trip
      </Button>
    </Box>
  );
};

TripForm.propTypes = {
  onTripCreated: PropTypes.func.isRequired, // Validate that onTripCreated is a function and is required
};

export default TripForm;
