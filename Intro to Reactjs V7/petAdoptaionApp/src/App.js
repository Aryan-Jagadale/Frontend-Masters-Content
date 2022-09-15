import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { StrictMode, useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue")
  const [isGreen, setIsGreen] = useState(true);
  const [time,setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  })
  
  

  
  return (
    <StrictMode>
      {/*<h1>Loll</h1>*/}
      <h1 onClick={() => setIsGreen(!isGreen)} style={{ color: isGreen ? "pink" : "red"}}>Welcome to PetFinder!</h1>
      <span>{time.toLocaleTimeString()}</span>


      <ThemeContext.Provider value={theme} >
      <div className="p-0 m-0" style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}>
      <BrowserRouter>
        <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <Link to="/" className="text-6xl text-white hover:text-gray-200">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
      </div>
      
      </ThemeContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
