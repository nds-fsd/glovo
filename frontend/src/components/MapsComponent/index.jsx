import {
  APIProvider,
  Map,
  Marker,
  useAutocomplete,
} from "@vis.gl/react-google-maps";
import React, { useRef, useState } from "react";

function MapsComponent() {
  const position = { lat: 53.54992, lng: 10.00678 };
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <APIProvider libraries={["places"]} apiKey={""}>
        <Map disableDefaultUI={true} center={position} zoom={10}>
          <Marker position={position} />
        </Map>
      </APIProvider>
      <input ref={inputRef} value={inputValue} onChange={handleInputChange} />
    </>
  );
}

export default MapsComponent;
