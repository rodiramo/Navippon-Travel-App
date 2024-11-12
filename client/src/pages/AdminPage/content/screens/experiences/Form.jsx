import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import config from "@config/config.js";

const Form = ({ experienceId = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prefecture: "",
    budget: "",
    contact: "",
    website: "",
    opening_time: "",
    closing_time: "",
    location: { coordinates: [0, 0] },
    availability: { all_year: false, best_season: [] },
    price: "",
    range_price: { min: 0, max: 0 },
    categories: [],
    subcategory: "",
    hotelType: "",
    hotelService: [],
    tripType: "",
    restaurantType: "",
    foodType: "",
    restaurantService: [],
    city: "",
    address: "",
    mapEmbedUrl: "",
    locationDes: "",
    phone: "",
    email: "",
    time: "",
    days: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (experienceId) {
      setLoading(true);
      fetch(`${config.API_URL}/experiences/${experienceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch experience");
          }
          return response.json();
        })
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [experienceId]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (key === "image" && formData.image) {
        formDataToSubmit.append(key, formData.image);
      } else {
        formDataToSubmit.append(key, JSON.stringify(formData[key]));
      }
    }

    setLoading(true);
    const method = experienceId ? "PATCH" : "POST";
    const url = experienceId
      ? `${config.API_URL}/experiences/${experienceId}`
      : `${config.API_URL}/experiences`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formDataToSubmit,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save experience");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Experience saved successfully");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>{experienceId ? "Edit Experience" : "Create Experience"}</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Prefecture:</label>
      <input
        type="text"
        name="prefecture"
        value={formData.prefecture}
        onChange={handleChange}
      />

      <label>Contact:</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
      />

      <label>Website:</label>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
      />

      <label>Opening Time:</label>
      <input
        type="text"
        name="opening_time"
        value={formData.opening_time}
        onChange={handleChange}
      />

      <label>Closing Time:</label>
      <input
        type="text"
        name="closing_time"
        value={formData.closing_time}
        onChange={handleChange}
      />

      <label>Location (Latitude, Longitude):</label>
      <input
        type="text"
        name="location"
        value={formData.location.coordinates.join(", ")}
        onChange={(e) =>
          setFormData({
            ...formData,
            location: { coordinates: e.target.value.split(",").map(Number) },
          })
        }
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />

      <label>Range Price (Min):</label>
      <input
        type="number"
        name="range_price.min"
        value={formData.range_price.min}
        onChange={handleChange}
      />

      <label>Range Price (Max):</label>
      <input
        type="number"
        name="range_price.max"
        value={formData.range_price.max}
        onChange={handleChange}
      />

      <label>Categories:</label>
      <select
        name="categories"
        multiple
        value={formData.categories}
        onChange={handleChange}
      >
        <option value="adventure">Adventure</option>
        <option value="cultural">Cultural</option>
        <option value="nature">Nature</option>
      </select>

      <label>Subcategory:</label>
      <input
        type="text"
        name="subcategory"
        value={formData.subcategory}
        onChange={handleChange}
      />

      <label>Hotel Type:</label>
      <input
        type="text"
        name="hotelType"
        value={formData.hotelType}
        onChange={handleChange}
      />

      <label>Trip Type:</label>
      <input
        type="text"
        name="tripType"
        value={formData.tripType}
        onChange={handleChange}
      />

      <label>Restaurant Type:</label>
      <input
        type="text"
        name="restaurantType"
        value={formData.restaurantType}
        onChange={handleChange}
      />

      <label>Food Type:</label>
      <input
        type="text"
        name="foodType"
        value={formData.foodType}
        onChange={handleChange}
      />

      <label>Restaurant Service:</label>
      <input
        type="text"
        name="restaurantService"
        value={formData.restaurantService}
        onChange={handleChange}
      />

      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <label>Location Description:</label>
      <textarea
        name="locationDes"
        value={formData.locationDes}
        onChange={handleChange}
      />

      <label>Map Embed URL:</label>
      <input
        type="text"
        name="mapEmbedUrl"
        value={formData.mapEmbedUrl}
        onChange={handleChange}
      />

      <label>Days Available:</label>
      <input
        type="text"
        name="days"
        value={formData.days}
        onChange={handleChange}
      />

      <label>Time:</label>
      <input
        type="text"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />

      <label>Image:</label>
      <input type="file" name="image" onChange={handleImageChange} />

      <button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : experienceId
          ? "Save Changes"
          : "Create Experience"}
      </button>
    </form>
  );
};

Form.propTypes = {
  experienceId: PropTypes.string.isRequired,
};

export default Form;
