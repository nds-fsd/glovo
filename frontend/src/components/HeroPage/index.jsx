import styles from "./styles.module.css";
import NavBar from "../NavBar";
import burguerImg from "../../assets/images/video-burger.png";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import compassIcon from "../../assets/icons/location-svgrepo-com.svg";
import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { React, useState } from "react";
import MapsComponent from "../MapsComponent";
import MapsAutocomplete from "../MapsAutocomplete";
import { useRef, useEffect } from "react";

export default function HeroPage({ setLocation }) {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setLocation(data.location);
    navigate("/restaurants");
  };
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "es" },
    fields: ["address_components", "geometry", "icon", "name"],
  };
  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        // Manejar caso en que no se selecciona un lugar válido
        return;
      }

      // Actualizar el valor del formulario aquí
      console.log(inputRef);
      setValue("location", place.formatted_address || place.name);
    });

    return () => {
      // Limpieza (remover el listener) cuando el componente se desmonte
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  return (
    <div className={styles.viewport}>
      <NavBar />
      <div className={styles.heroContainer}>
        <img className={styles.burgerImg} src={burguerImg} alt="" />
        <div className={styles.textContainer}>
          <h1>Comida a domicilio y más</h1>
          <p>Tiendas, farmacias, todo!</p>

          <div className={styles.inputBar}>
            <div className={styles.flagIconContainer}>
              <img className={styles.flagIcon} src={flagIcon} alt="" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("location", { required: true })}
                ref={inputRef}
                className={styles.addressInput}
                placeholder="Cuál es tu dirección?"
              />
              <input style={{ display: "none" }} type="submit" />
            </form>
            <button className={styles.useCurrentLocationButton}>
              <div className={styles.compassIconContainer}>
                <img className={styles.compassIcon} src={compassIcon} alt="" />
              </div>
              <p className={styles.useCurrentLocationText}>
                Usar la ubicación actual
              </p>
            </button>
          </div>
        </div>
      </div>
      <img className={styles.wavySvg} src={wavySvg} alt="" />
    </div>
  );
}
