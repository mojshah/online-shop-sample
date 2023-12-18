import { PushPin } from "@mui/icons-material";
import Map, { Marker } from "react-map-gl";
import myLocation from "../../constants/locations/myLocation.json";
import "mapbox-gl/dist/mapbox-gl.css";

const MapGl = ({ width = "400px", height = "250px" }) => {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ"
      initialViewState={{
        latitude: 35.72352459902921,
        longitude: 51.518865225061475,
        zoom: 12,
      }}
      style={{ width: `${width}`, height: `${height}`, borderRadius: "0.5rem" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {myLocation?.RECORDS?.map((area) => (
        <Marker
          key={area?.id}
          longitude={area?.geometry?.coordinates[1]}
          latitude={area.geometry.coordinates[0]}
          anchor={"center"}
        >
          <PushPin size={40} color={"error"} />
        </Marker>
      ))}
    </Map>
  );
};

export default MapGl;
