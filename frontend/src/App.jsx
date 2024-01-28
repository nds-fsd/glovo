import "./App.css";
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import Formulario from "./components/formularios/formularios";
import React, { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserToken, getUserSession } from "./utils/localStorage.utils";
import { CartContext } from "./contexts/CartContext";
import { OrderContext } from "./contexts/OrderContext";

import ConfirmationPage from "./components/ConfirmationPage";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [order, setOrder] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const [user, setLocalUser] = useState(null);

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
    <div>
      <UserContext.Provider value={{ user, setLocalUser }}>
        <OrderContext.Provider value={{ order, setOrder }}>
          <CartContext.Provider value={{ shoppingList, setShoppingList }}>
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
                <Route
                  path="/confirmation"
                  element={<ConfirmationPage />}
                ></Route>
                <Route path="/formularios" element={<Formulario />} />
              </Routes>

              <Footer />
            </BrowserRouter>
          </CartContext.Provider>
        </OrderContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
