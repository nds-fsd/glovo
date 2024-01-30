import {
  APIProvider,
  Map,
  Marker,
  useAutocomplete,
} from "@vis.gl/react-google-maps";
import React, { useRef, useState } from "react";
import "./styles.css";

function MapsComponent({ coordinates }) {
  const position = coordinates;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <APIProvider
        libraries={["places"]}
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      >
        <Map disableDefaultUI={true} center={position} zoom={15}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </>
  );
}

export default MapsComponent;
