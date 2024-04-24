/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { toast } from "react-toastify"; 

const Navbar = ({ setQuery, weather, units, setUnits }) => {
	const [input, setInput] = useState('');

    const handleLocationClick = () => {
        if (navigator.geolocation) {
          toast.info("Fetching users location.");
          navigator.geolocation.getCurrentPosition((position) => {
            toast.success("Location fetched!");
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
    
            setQuery({
              lat,
              lon,
            });
          });
        }
      };
      const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) setUnits(selectedUnit);
      };

	const locations = [
		{
      id: 1,
      loc: "Stockholm",
    },
    {
      id: 2,
      loc: "Dubai",
    },
    {
      id: 3,
      loc: "New York",
    },
    {
      id: 4,
      loc: "Los Angeles",
    },
    {
      id: 5,
      loc: "Paris",
    },

	];
	return (
		<div className='w-full h-fit mt-3 flex flex-col justify-center items-center gap-7  rounded-xl'>
			<div className='locations w-fullfont-semibold  flex justify-center items-center gap-10 px-3'>
				{locations.map((locs) => {
					return (
						<span
							key={locs.id}
							className='text-white hover:text-opacity-85 transition-colors duration-300 ease-in-out cursor-pointer'
							onClick={() => setQuery({ q: locs.loc, units: 'metric' })}
						>
							{locs.loc}
						</span>
					);
				})}
			</div>
			<div className='flex relative items-center shadow-2xl'>
				<IoSearch
					size={20}
					className='absolute right-4 top-[10px] cursor-pointer text-white'
					onClick={() => setQuery({ q: input, units: 'metric' })}
				/>
				<input
					type='text'
					placeholder='Enter Your Location'
					className='text-white font-medium text-base bg-white bg-opacity-15 focus-within:placeholder:text-opacity-75 placeholder:text-white placeholder:text-base outline-none w-52 px-4 py-2 rounded-md'
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>
			<CiLocationOn
				size={25}
				className='text-white cursor-pointer transition ease-out hover:scale-125'
                onClick={handleLocationClick}
			/>
            <div className="flex flex-row w-1/4 items-center justify-center">
      <button
        name="metric"
        className="text-xl text-white font-light transition ease-out hover:scale-125"
        onClick={handleUnitsChange}
      >
        °C
      </button>
      <p className="text-xl text-white mx-1">|</p>
      <button
        name="imperial"
        className="text-xl text-white font-light transition ease-out hover:scale-125"
        onClick={handleUnitsChange}
      >
        °F
      </button>
    </div>
			{weather && (
				<div className='flex items-center justify-center gap-2 text-white font-medium'>
					<p>{weather.localdate}</p>
					<span>|</span>
					<p>Local Time : {weather.localTime}</p>
				</div>
			)}
		</div>
	);
};

export default Navbar;
