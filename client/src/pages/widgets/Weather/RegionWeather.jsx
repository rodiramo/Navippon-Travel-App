import { useEffect, useState } from "react";
import { fetchWeather } from "./Weather.jsx";

const RegionWeather = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather(latitude, longitude);
      setWeather(weatherData);
    };

    getWeather();
  }, [latitude, longitude]);

  return (
    <div>
      {weather ? (
        <div>
          <h3>Weather in Region</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default RegionWeather;
