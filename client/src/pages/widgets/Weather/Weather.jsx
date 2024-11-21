import axios from "axios";

// Replace with your own OpenWeatherMap API Key
const API_KEY = "7b617d88da13dabf76b0cc02169f923c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch weather based on latitude and longitude
export const fetchWeather = async (latitude, longitude) => {
  console.log("Fetching weather for", latitude, longitude);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
        lang: "es",
      },
    });

    if (response.data && response.data.weather && response.data.main) {
      const { temp, weather } = response.data;
      return {
        temperature: temp,
        description: weather[0].description,
        icon: weather[0].icon,
      };
    } else {
      console.error("No weather data found in the response.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather data", error);
    return null;
  }
};
