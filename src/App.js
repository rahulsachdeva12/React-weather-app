import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "/REACT-WEATHER-APP/icons/sunny.svg",
  "01n": "/REACT-WEATHER-APP/icons/night.svg",
  "02d": "/REACT-WEATHER-APP/icons/day.svg",
  "02n": "/REACT-WEATHER-APP/icons/cloudy-night.svg",
  "03d": "/REACT-WEATHER-APP/icons/cloudy.svg",
  "03n": "/REACT-WEATHER-APP/icons/cloudy.svg",
  "04d": "/REACT-WEATHER-APP/icons/perfect-day.svg",
  "04n": "/REACT-WEATHER-APP/icons/cloudy-night.svg",
  "09d": "/REACT-WEATHER-APP/icons/rain.svg",
  "09n": "/REACT-WEATHER-APP/icons/rain-night.svg",
  "10d": "/REACT-WEATHER-APP/icons/rain.svg",
  "10n": "/REACT-WEATHER-APP/icons/rain-night.svg",
  "11d": "/REACT-WEATHER-APP/icons/storm.svg",
  "11n": "/REACT-WEATHER-APP/icons/storm.svg",
  "13d": "/REACT-WEATHER-APP/icons/snow.png",
  "13n": "/REACT-WEATHER-APP/icons/snow.png",
  "50d": "/REACT-WEATHER-APP/icons/haze-day.png",
  "50n": "/REACT-WEATHER-APP/icons/haze-night.png",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.95);
  font-family: Montserrat;
`;

const AppLabel = styled.span`
color: #333;
margin: 20px auto;
font-size: 32px;
font-weight: bold;
`;
const Attribution = styled.span`
  color: #666;
  font-size: 10px;
  margin-top: 5px;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [error, setError] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
      );
      setError(null);
      updateWeather(response.data);
    }
    catch (error) {
      setError("City not found. Please enter a valid city name.");
    }
  };

  return (
    <Container>
      <AppLabel> Weather App</AppLabel>
      {error && <span>{error}</span>}
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} timezone={weather?.timezone} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
      <Attribution>
        Weather data provided by <a href="https://www.openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>
      </Attribution>
    </Container>
  );
}

export default App;