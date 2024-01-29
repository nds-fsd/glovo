import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function MapsComponent() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <APIProvider apiKey={""}>
      <Map disableDefaultUI={true} center={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default MapsComponent;
