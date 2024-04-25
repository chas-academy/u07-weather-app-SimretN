import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather'; 
import Navbar from './components/Navbar'; 
import WeatherForecast from './components/WeatherForecast'; 
import getFormattedWeatherData from './services/weatherService';
import DailyWeatherforecast from './components/DailyWeatherforecast'; 


import './App.css';

function App() {
  
	const getLocation = async () => {
		const pos = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		setStatus('');
		return {
			lat: pos.coords.latitude,
			lon: pos.coords.longitude,
			units: 'metric',
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
					<div className='max-w-screen-md min-h-screen px-10 py-5 flex flex-col gap-5 mx-auto  bg-opacity-25 font-titillium font-bold text-xl'>
						<h1>Simret Weather App</h1>
						<Navbar setQuery={setQuery} units={units} setUnits={setUnits} weather={weather} />
						{!weather && (
              <h2 className='text-white text-center text-lg font-semibold mt-5'>To access weather forecast give location manually or give access to device's location</h2>
            )}
            
            {weather && (
              <>
            <CurrentWeather weather={weather} />
						<WeatherForecast title= "hourly" weather={weather} items={weather.hourly}/>
						{/* <DailyWeatherforecast title= "daily" weather={weather} items={weather.daily}/> */}
            <DailyWeatherforecast weather={weather} items={weather.daily} />
            {/* weather.daily && <DailyWeatherforecast weather={weather} />  */}
           </>
					)}
           </div>
				</div>
			
		</>
	);
}

export default App;

/*import { useEffect, useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import Navbar from './components/Navbar'
import WeatherForecast from './components/WeatherForecast'
import getFormattedWeatherData from './services/weatherService'

import './App.css'

function App() {
  const [query, setQuery] = useState({ q: '', units: 'metric' }) // Initialize query with an empty string for location
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData({ ...query })
      setWeather(data)
    }
    fetchWeatherData()
  }, [query])

  // Function to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ q: `${latitude},${longitude}`, units: 'metric' });
        },
        () => {
          console.error("Unable to retrieve your location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getUserLocation(); // Fetch user's location when component mounts
  }, []); // Empty dependency array ensures this effect runs only once after initial render

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

export default App*/
