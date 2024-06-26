import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { useState } from "react";

function App() {
  // const  [search, setSearch] = useState({""})

  const searchClicked = () => {
  };

  return (
    <>
      <div className="bg-black py-5  ">
        <input
          type="text"
          placeholder="search coountries"
          className="border-solid border-2 rounded-lg m-2 p-1"
        />
        <button
          onClick={searchClicked}
          className="bg-violet-400 text-white m-4 px-4 py-2 rounded-lg m-1 shadow-lg"
        >
          Search
        </button>

        {/* citylist */}
        <p className="bg-violet-400  ">Stockholm</p>
        {/* degreeCentigrade */}
        <p className="bg-red-400  text-center">30 C°</p>
        {/* feeling */}
        <p className="bg-green-400 ">Sunny</p>
      </div>
    </>
  );
}

export default App;
