import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Navbar from "./components/Navbar";
import WeatherForecast from "./components/WeatherForecast";
import getFormattedWeatherData from "./services/weatherService";
import DailyWeatherforecast from "./components/DailyWeatherforecast";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const getLocation = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    setStatus("");
    return {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
      units: "metric",
    };
  };
  const [status, setStatus] = useState(null);
  const [query, setQuery] = useState(null);
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!query) {
        setStatus("Loading");
        await getLocation().then((x) => setQuery(x));
        return;
      }
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    };

    fetchWeatherData();
  }, [query, units]);

  return (
    <>
      <div className={`max-w-full  main-container`}>
        <div className="max-w-screen-md min-h-screen px-10 py-5 flex flex-col gap-5 mx-auto items-center justify-center text-center bg-opacity-25 font-titillium font-bold text-xl">
          <h1 className=" text-white text-3xl mb-5 flex justify-center ">
            SIMRET WEATHER APP
          </h1>
          <Navbar
            setQuery={setQuery}
            units={units}
            setUnits={setUnits}
            weather={weather}
          />
          {!weather && (
            <h2 className="text-white text-center text-lg font-semibold mt-5">
              To access weather forecast give location manually or give access
              to device's location
            </h2>
          )}

          {weather && (
            <>
              <CurrentWeather weather={weather} />
              <WeatherForecast
                title="hourly"
                weather={weather}
                items={weather.hourly}
              />
              {/* <DailyWeatherforecast title= "daily" weather={weather} items={weather.daily}/> */}
              <DailyWeatherforecast weather={weather} items={weather.daily} />
              {/* weather.daily && <DailyWeatherforecast weather={weather} />  */}
            </>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
