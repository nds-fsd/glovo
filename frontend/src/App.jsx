import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroPage />}></Route>
          <Route path="/restaurants" element={<HomePage />}></Route>
          <Route path="/restaurant" element={<RestaurantPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
