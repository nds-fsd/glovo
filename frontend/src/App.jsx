import "./App.css";
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import PerfilUsuario from "./components/PerfilUsuario/PerfilUsuario";
import Formulario from "./components/formularios/formularios";
// import VistaCompra from "./components/vistaCompra/vistaCompra";
import { React, useState } from "react";
import Footer from "../src/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const isLogged = !!getUserToken();
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
