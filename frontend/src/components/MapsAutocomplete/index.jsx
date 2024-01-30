import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import styles from "../MapsAutocomplete/styles.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AutoComplete = ({
  register,
  setFormValue,
  setCoordinates,
  coordinates,
}) => {
  const [postalCode, setPostalCode] = useState("");
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
      setFormValue("address", description);
      setValue(description, false);
      clearSuggestions();
      console.log(data);

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const zipCode = getZipCode(results[0], false);
        setPostalCode(zipCode);

        const { lat, lng } = getLatLng(results[0]);
        setCoordinates({ lat: lat, lng: lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <AnimatePresence>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={styles.individualPlace}
            key={place_id}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </motion.li>
        </AnimatePresence>
      );
    });

  return (
    <div ref={ref}>
      <input
        {...register("address")}
        autoComplete="off"
        type="text"
        placeholder="Dirección"
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      <AnimatePresence>
        {status === "OK" && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", maxHeight: "28%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className={styles.listContainer}
          >
            {renderSuggestions()}
          </motion.ul>
        )}
      </AnimatePresence>
      {coordinates && (
        <>
          {" "}
          <div className={styles.extraInputs}>
            <input
              {...register("cp")}
              type="text"
              value={postalCode}
              placeholder="Código postal"
              required
            />
            <input
              {...register("number")}
              type="text"
              placeholder="Número"
              required
            />
          </div>
          <input
            {...register("extra")}
            type="text"
            placeholder="Piso, puerta, indicaciones"
          />
        </>
      )}
    </div>
  );
};

export default AutoComplete;
