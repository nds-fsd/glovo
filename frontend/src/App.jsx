import "./App.css";
import "../src/index.css";
import RestaurantPage from "./components/RestaurantPage";
import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import HeroPage from "./components/HeroPage/index";
import Formulario from "./components/formularios/formularios";
import React, { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { getUserToken, getUserSession } from "./utils/localStorage.utils";
import { CartContext } from "./contexts/CartContext";
import { OrderContext } from "./contexts/OrderContext";
import DashBoard from "./components/DashBoard/dashBoard";
import ConfirmationPage from "./components/ConfirmationPage";
import { UserContext } from "./contexts/UserContext";
import LandbotChat from "./components/LandbotChat";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [order, setOrder] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [location, setLocation] = useState("");

  const [user, setLocalUser] = useState(null);


  useEffect(() => {
    const session = getUserSession();
    if (session && session.token) {
      setIsAuthenticated(true);
      setUser(session.user); 
    }
  }, []);

  const handleLogin = async (credentials) => {
 
  };

  return (
    <div>
      <UserContext.Provider value={{ user, setLocalUser }}>
        <OrderContext.Provider value={{ order, setOrder }}>
          <CartContext.Provider value={{ shoppingList, setShoppingList }}>
            <BrowserRouter>
              <NavBar location={location} />

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
                  path="/confirmation/:orderId"
                  element={<ConfirmationPage />}
                ></Route>
                <Route path="/formularios" element={<Formulario />} />
                <Route path="/dashBoard" element={<DashBoard />} />
              </Routes>
              <LandbotChat />
              <Footer />
            </BrowserRouter>
          </CartContext.Provider>
        </OrderContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
