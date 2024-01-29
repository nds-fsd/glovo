import { useRef, useEffect } from "react";
import "../MapsAutocomplete/styles.css";

const AutoComplete = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "es" },
    fields: ["address_components", "geometry", "icon", "name"],
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }, []);
  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
};
export default AutoComplete;
