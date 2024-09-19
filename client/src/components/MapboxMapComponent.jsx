import PropTypes from "prop-types";
import { MapContainer, Marker, TileLayer } from "react-leaflet"; // or your chosen map library

const MapboxMapComponent = ({ coordinates }) => {
  const [latitude, longitude] = coordinates;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Use your Mapbox URL here
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
};
MapboxMapComponent.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired, // Expecting an array of numbers
};
export default MapboxMapComponent;
