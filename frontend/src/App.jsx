import "./App.css";
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import Formulario from "./components/formularios/formularios";
import { React, useState } from "react";
import Footer from "../src/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserToken } from "./utils/localStorage.utils";

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const isLogged = !!getUserToken();
  const [location, setLocation] = useState("");

  return (
    <div>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={<HeroPage setLocation={setLocation} />}
          ></Route>
          <Route
            path="/restaurants"
            element={<HomePage location={location} />}
          ></Route>
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantPage />}
          ></Route>
          <Route path="/formularios" element={<Formulario />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
