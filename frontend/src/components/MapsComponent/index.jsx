import {
  APIProvider,
  Map,
  Marker,
  useAutocomplete,
} from "@vis.gl/react-google-maps";
import React, { useRef, useState } from "react";

function MapsComponent({ coordinates }) {
  const position = coordinates;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <APIProvider
        libraries={["places"]}
        apiKey={"AIzaSyD0k0uSKnmT8n2bHWKlWfZUW92q1Bixvf8"}
      >
        <Map disableDefaultUI={true} center={position} zoom={15}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </>
  );
}

export default MapsComponent;
