
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { useState } from "react";


function App() {
  // const  [search, setSearch] = useState({""})

const searchClicked = () => {
  console.log(searchClicked, "simret clicked");
}

  return (
    <>
    <Header/>
      <div>
        <input type="text" placeholder="search coountries" className="text-xl font-bold border"/>
      <button onClick={searchClicked} className="bg-violet-400 text-white m-4 px-4 py-2 rounded-lg m-1 shadow-lg">Search</button>
      </div>
      {/* citylist */}
      <p>Stockholm</p>
      {/* degreeCentigrade */}
      <p>30 C°</p>
      {/* feeling */}
      <p>Sunny</p>
      <Footer/>
    </>
  );
}

export default App;
