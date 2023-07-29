import React,{ useState } from "react";
import styled from "styled-components";
import {WeatherIcons} from "../App";

export const WeatherInfoIcons = {
    sunset: "/icons/temp.svg",
    sunrise: "/icons/temp.svg",
    humidity: "/icons/humidity.svg",
    wind: "/icons/wind.svg",
    pressure: "/icons/pressure.svg",
};
const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;
const CurrentDateTime = styled.span`
  margin: 10px auto;
  font-size: 14px;
`;
const TemperatureButton = styled.button`
background-color: black;
font-size: 14px;
padding: 8px 12px;
color: white;
border: none;
outline: none;
cursor: pointer;
font-family: Montserrat;
font-weight: bold;
transition: background-color 0.3s ease-in-out;
&:hover {
  background-color: #333;
`;

const WeatherInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    );
};
const WeatherComponent = (props) => {
  const { weather, timezone } = props;
    const isDay = weather?.weather[0].icon?.includes('d')
    const [temperatureUnit, setTemperatureUnit] = useState("celsius");
    const getTime = (timeStamp) => {
      const date = new Date(timeStamp * 1000); // Convert Unix timestamp to milliseconds
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;
    }
    // Helper function to format date and time
    const formatDateTime = (date) => {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Kolkata', // Set to IST timezone
      };
      return date.toLocaleString(undefined, options);
    };
    
    const getCurrentDateTime = (timezone) => {
      const currentDate = new Date();
      const localOffsetInMinutes = currentDate.getTimezoneOffset(); // Get local timezone offset in minutes
      const targetOffsetInMinutes = timezone / 60; // Convert API timezone offset from seconds to minutes
      const totalOffsetInMinutes = targetOffsetInMinutes + localOffsetInMinutes;
    
      const localTimeInMilliseconds = currentDate.getTime() + totalOffsetInMinutes * 60 * 1000;
      const localDate = new Date(localTimeInMilliseconds);
      return formatDateTime(localDate);
    };

    const toggleTemperatureUnit = () => {
      setTemperatureUnit(temperatureUnit === "celsius" ? "fahrenheit" : "celsius");
    };
  
    return (
        <>
            <WeatherContainer>
                <Condition>
                <span>
            {temperatureUnit === "celsius"
              ? `${Math.floor(weather?.main?.temp - 273)}°C`
              : `${Math.floor((weather?.main?.temp - 273) * (9 / 5) + 32)}°F`}
          </span>

                    {`  |  ${weather?.weather[0].description}`}
                </Condition>
                <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]}/>
            </WeatherContainer>
            <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
            <CurrentDateTime>{getCurrentDateTime(timezone)}</CurrentDateTime>
            <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={isDay ? "sunset" : "sunrise"}
                                      value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}/>
                <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity}/>
                <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed}/>
                <WeatherInfoComponent name={"pressure"} value={weather?.main?.pressure}/>
            </WeatherInfoContainer>
            <TemperatureButton onClick={toggleTemperatureUnit}>
        {temperatureUnit === "celsius" ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </TemperatureButton>

        </>
    );
};

export default WeatherComponent;