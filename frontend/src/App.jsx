
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import PerfilUsuario from "./components/PerfilUsuario/PerfilUsuario";
import React from "react";

function App() {
  return (
    <>
      <NavBar />;
      <PerfilUsuario />;
      <HeroPage />;
      <HomePage />;
     <RestaurantPage />
    </>

  );
}

export default App;
