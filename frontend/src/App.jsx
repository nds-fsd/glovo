import "./App.css";
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import Formulario from "./components/formularios/formularios";
import React, { useState } from "react"; // Cambia a 'React, { useState }'
import Footer from "../src/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserToken } from "./utils/localStorage.utils";
// Asegúrate de importar loginApi si es necesario

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    email: "",
    phone: ""
  });

  const handleLogin = async (credentials) => {
    const response = await loginApi(credentials); // Implementa loginApi adecuadamente
    setUser(response.data.user);
  };

  const isLogged = !!getUserToken();

  return (
    <div>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<HeroPage setLocation={setLocation} />}></Route>
          <Route path="/restaurants" element={<HomePage location={location} />}></Route>
          <Route path="/restaurant/:restaurantId" element={<RestaurantPage />}></Route>
          <Route path="/formularios" element={<Formulario />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
