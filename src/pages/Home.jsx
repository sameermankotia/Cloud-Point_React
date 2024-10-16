import { useOutletContext } from "react-router-dom";
import Weather from "../components/Weather";
import getDate from "../utils/getDate";

const HomePage = () => {
  const { units, hourly, current_weather, timezone } = useOutletContext();

  const { hourlyWeatherCodes, hourlyTimes, hourlyTemperatures } = hourly;

  // Create a date object for the city's timezone
  const cityDate = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

  const [date, currentHour] = [
    "Today ".concat(
      getDate(cityDate, { hour: "numeric", minute: "numeric", timeZone: timezone })
    ),
    Number(getDate(cityDate, { hour: "numeric", hourCycle: "h23", timeZone: timezone })),
  ];

  const index = hourlyTimes.findIndex(
    (hourlyTime) =>
      Number(hourlyTime.split("T").at(1).split(":").at(0)) === currentHour
  );

  const slicedHours = hourlyTimes.slice(index, index + 13);
  const slicedWeatherCodes = hourlyWeatherCodes.slice(index, index + 13);
  const slicedTemperatures = hourlyTemperatures.slice(index, index + 13);

  const hourlyWeathers = {
    hours: slicedHours,
    codes: slicedWeatherCodes,
    temperatures: slicedTemperatures,
  };

  return (
    <Weather
      weather={current_weather}
      units={units}
      date={date}
      hourlyWeathers={hourlyWeathers}
    />
  );
};

export default HomePage;