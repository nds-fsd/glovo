import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import { React, useState } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { set } from "react-hook-form";

function App() {
  const [location, setLocation] = useState("");

  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HeroPage setLocation={setLocation} />}
          ></Route>
          <Route
            path="/restaurants"
            element={<HomePage location={location} />}
          ></Route>
          <Route path="/restaurant" element={<RestaurantPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
