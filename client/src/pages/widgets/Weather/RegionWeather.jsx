import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, CircularProgress, useTheme } from "@mui/material";
import { fetchWeather } from "@widgets/Weather/Weather.jsx";
import weatherIconMap from "./icons/iconMapping.jsx";
import { styled } from "@mui/system";

const WeatherCard = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "175px",
  height: "175px",
  borderRadius: "20px",
  position: "relative",
  boxShadow: "0px 0px 25px 1px rgba(50, 50, 50, 0.1)",
  margin: "20px 5px",
  animation: "appear 500ms ease-out forwards",
  "@keyframes appear": {
    "0%": { transform: "scale(0)" },
    "50%": { transform: "scale(1.05)" },
    "75%": { transform: "scale(0.95)" },
    "100%": { transform: "scale(1)" },
  },
}));

const WeatherIcon = styled("img")({
  position: "absolute",
  top: 0,
  right: 20,
  marginTop: "15px",
  width: "50px",
  height: "50px",
  animation: "weather-icon-move 5s ease-in-out infinite",
  "@keyframes weather-icon-move": {
    "50%": { transform: "translateY(-8px)" },
  },
});

const RegionWeather = ({ latitude, longitude }) => {
  const theme = useTheme();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weather = await fetchWeather(latitude, longitude);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching weather:", error.message);
        setError("Error al obtener el clima");
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!weatherData) {
    return <CircularProgress />;
  }

  const customIcon =
    weatherIconMap[weatherData.description] || "/assets/cloud-icon.png";

  return (
    <WeatherCard>
      <WeatherIcon src={customIcon} alt={weatherData.description} />
      <Typography
        variant="h3"
        sx={{
          position: "absolute",
          bottom: 32,
          fontWeight: "light",
          fontSize: 45,
          left: 15,
          color: theme.palette.neutral.medium,
        }}
      >
        {weatherData.temperature}°
      </Typography>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          fontWeight: 300,
          fontSize: 20,
          textTransform: "uppercase",
          fontFamily: ["SifonnPro", "sans-serif"],
          color: theme.palette.secondary.main,
          bottom: 8,
          left: 15,
        }}
      >
        {weatherData.description}
      </Typography>
    </WeatherCard>
  );
};

RegionWeather.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default RegionWeather;
