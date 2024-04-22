

import { useEffect, useState } from 'react'
import CurrentWeather from './components/CurrentWeather' // Fixed import path
import Navbar from './components/Navbar' // Fixed import path
import WeatherForecast from './components/WeatherForecast' // Fixed import path
import getFormattedWeatherData from './services/weatherService'

import './App.css'

function App() {
   //get user geo location
  //  let query = {};
  //  if (navigator.geolocation) {
  //    navigator.geolocation.getCurrentPosition(
  //      (position) => {          
  //        query.lat = position.coords.latitude;
  //        query.lon = position.coords.longitude;
         
  //      },
  //      () => {
  //        setStatus("Unable to retrieve your location");
  //      }
  //    );
  //  }
  // const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState({ q: 'Tokyo', units: 'metric' })
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData({ ...query }) // Removed unnecessary .then()
      setWeather(data)
      console.log(query)
    }
    fetchWeatherData()
  }, [query])

  return (
    <>
      {weather && (
        <div className={`max-w-full  main-container`}>
          <div className='max-w-screen-md min-h-screen px-10 py-5 flex flex-col gap-5 mx-auto bg-white bg-opacity-25 font-titillium font-bold text-xl'>
            <Navbar setQuery={setQuery} weather={weather} />
            <CurrentWeather weather={weather} />
            <WeatherForecast weather={weather} />
          </div>
        </div>
      )}
    </>
  )
}

export default App





