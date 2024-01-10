import "./App.css"; 
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import PerfilUsuario from "./components/PerfilUsuario/PerfilUsuario";
import Formulario from "./components/formularios/formularios";
import VistaCompra from "./components/VistaCompra/vistaCompra";
import { React, useState } from "react";
import Footer from "../src/components/Footer";
import RestaurantForm from "./components/RestaurantForm/restaurantForm";
import ConfirmationPage from "./components/RestaurantForm/confirmationPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PerfilPartner from "./components/PerfilPartner/perfilPartner";



function App() {
  const [location, setLocation] = useState("");

  return (

    <div>
       {/* <PerfilPartner />   */}
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
        <Route path="/vistaCompra" element={<VistaCompra />} />
        <Route path="/formularios" element={<Formulario /> } />
      <Route path="/restaurantForm" element={<RestaurantForm />} />
      <Route path="/confirmationPage" element={<ConfirmationPage />} />
        </Routes>
      <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
