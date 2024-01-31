import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "../HeroPage/styles.module.css";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import compassIcon from "../../assets/icons/location-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function DirectionBar({ setLocation }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setLocation(data.location);
    navigate("/restaurants");
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el event listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const findMyLocation = () => {
    const statusLocation = document.querySelector(".status");
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}
          &location_type=ROOFTOP&result_type=street_address&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`;
      fetch(geolocationUrl)
        .then((res) => res.json())
        .then((data) => {
          // const formattedAdress = data.results[0].formatted_address;
          const addressComponents = data.results[0].address_components;
          console.log(addressComponents[1].short_name);

          const formattedAdress =
            addressComponents[1].short_name +
            ", " +
            addressComponents[2].short_name +
            ", " +
            addressComponents[3].long_name +
            ", " +
            addressComponents[5].long_name;

          console.log(formattedAdress);

          setValue(formattedAdress);
        });
    };
    const error = () => {
      console.log("hubo un error");
    };
    navigator.geolocation.getCurrentPosition(success, error);
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
    <>
      <motion.div className={styles.textContainer}>
        <motion.div className={styles.onlyTextContainer} layout>
          <h1>Comida a domicilio y más</h1>
          <p>Tiendas, farmacias, todo!</p>
        </motion.div>

        <motion.div layout className={styles.inputBar}>
          <div className={styles.flagIconContainer}>
            <img className={styles.flagIcon} src={flagIcon} alt="" />
          </div>

          <input
            {...register("location", { required: true })}
            autoComplete="off"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            className={styles.addressInput}
            placeholder="Cuál es tu dirección?"
          />
          {windowWidth > 900 && !value ? (
            <button
              transition={{ ease: "easeOut", duration: 0.1 }}
              onClick={findMyLocation}
              className={styles.useCurrentLocationButton}
            >
              <div className={styles.compassIconContainer}>
                <img className={styles.compassIcon} src={compassIcon} alt="" />
              </div>
              <motion.p
                key="button1"
                initial={{ width: 0 }}
                animate={{ width: "110px" }}
                exit={{ width: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className={styles.useCurrentLocationText}
              >
                Usar la ubicación actual
              </motion.p>
            </button>
          ) : (
            <button
              onClick={findMyLocation}
              className={styles.useCurrentLocationButtonSmall}
            >
              <div className={styles.compassIconContainer}>
                <img className={styles.compassIcon} src={compassIcon} alt="" />
              </div>
            </button>
          )}
        </motion.div>
        {status === "OK" && (
          <ul className={styles.listContainer}>{renderSuggestions()}</ul>
        )}
      </motion.div>
    </>
  );
}
