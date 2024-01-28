import "./App.css";
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import Formulario from "./components/Formularios/formularios";
import React, { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserToken, getUserSession } from "./utils/localStorage.utils";
import DashBoard from "./components/DashBoard/dashBoard";

export const userContext = React.createContext();

function App() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    email: "",
    phone: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = getUserSession();
    if (session && session.token) {
      setIsAuthenticated(true);
      setUser(session.user); // Opcional, si quieres almacenar los datos del usuario en el estado
    }
  }, []);

  const handleLogin = async (credentials) => {
    // Implementación de inicio de sesión
  };

  return (
    <userContext.Provider value={user}>
      <div>
        {/* <DashBoard /> */}
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
    </userContext.Provider>
  );
}

export default App;
