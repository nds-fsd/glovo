import React, { useEffect, useState } from "react";
import RestauranteCard from "./RestauranteCard";
import { api } from "../../utils/api";

const RestaurantesList = () => {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const response = await api.get("/restaurantes");
        setRestaurantes(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los restaurantes:", error);
      }
    };

    obtenerRestaurantes();
  }, []);

  return (
    <div className="restaurantes-list">
      <h1>Listado de Restaurantes</h1>
      {restaurantes.map((restaurante) => (
        <RestauranteCard key={restaurante._id} restaurante={restaurante} />
      ))}
    </div>
  );
};

export default RestaurantesList;
