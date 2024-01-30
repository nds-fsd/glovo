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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroPage({ setLocation }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setLocation(data.location);
    navigate("/restaurants");
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      componentRestrictions: { country: "es" },

      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });

      setLocation(description, false);
      setTimeout(() => {
        navigate("/restaurants");
      }, 500);
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut", duration: 0.8 }}
          className={styles.individualPlace}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </motion.li>
      );
    });

  return (
    <div className={styles.viewport}>
      <NavBar />
      <div className={styles.heroContainer}>
        <img className={styles.burgerImg} src={burguerImg} alt="" />
        <AnimatePresence>
          <motion.div ref={ref} className={styles.textContainer}>
            <motion.div className={styles.onlyTextContainer} layout>
              <h1>Comida a domicilio y más</h1>
              <p>Tiendas, farmacias, todo!</p>
            </motion.div>

            <motion.div layout className={styles.inputBar}>
              <div className={styles.flagIconContainer}>
                <img className={styles.flagIcon} src={flagIcon} alt="" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("location", { required: true })}
                  autocomplete="off"
                  value={value}
                  onChange={handleInput}
                  disabled={!ready}
                  className={styles.addressInput}
                  placeholder="Cuál es tu dirección?"
                />
                <input style={{ display: "none" }} type="submit" />
              </form>
              <button className={styles.useCurrentLocationButton}>
                <div className={styles.compassIconContainer}>
                  <img
                    className={styles.compassIcon}
                    src={compassIcon}
                    alt=""
                  />
                </div>
                <p className={styles.useCurrentLocationText}>
                  Usar la ubicación actual
                </p>
              </button>
            </motion.div>
            {status === "OK" && (
              <ul className={styles.listContainer}>{renderSuggestions()}</ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <img className={styles.wavySvg} src={wavySvg} alt="" />
    </div>
  );
}
