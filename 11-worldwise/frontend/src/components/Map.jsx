import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useAuth } from "../contexts/AuthContext";

export default function Map() {
  const [lat, lng] = useUrlPosition();
  const [mapCenter, setMapCenter] = useState([lat || 51.505, lng || -0.09]);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const {isAuthenticated} = useAuth();
  const { cities } = useCities();
  const navigate = useNavigate();


  const {
    position: geolocationPosition,
    isLoading: isGeolocationLoading,
    error,
    getPosition,
  } = useGeolocation(cbOnSuccess);

  useEffect(() => {
    if (lat && lng) {
      if (!isMapClicked) setMapCenter([lat, lng]);
    }
    setIsMapClicked(false);
  }, [lat, lng]);

  function cbOnSuccess(lat, lng) {
    navigate(`form?lat=${lat}&lng=${lng}`);
  }

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && isAuthenticated && (
        <Button type="position" onClick={getPosition}>
          {isGeolocationLoading ? "Loading..." : "Use Your current location"}
        </Button>
      )}
      <MapContainer
        center={mapCenter}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city._id}
          >
            <Popup>
              <span> {city.emoji}</span>
              <span>
                {city.cityName} <br />
                {city.notes}
              </span>
            </Popup>
          </Marker>
        ))}
        {
          isAuthenticated &&
        <DetectMapClicks setIsMapClicked={setIsMapClicked} />
        }
        <ChangeMapCenter
          mapCenter={mapCenter}
          isMapClicked={isMapClicked}
          setIsMapClicked={setIsMapClicked}
          setMapCenter={setMapCenter}
        />
      </MapContainer>
    </div>
  );
}

function DetectMapClicks({ setIsMapClicked }) {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      setIsMapClicked(true);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

function ChangeMapCenter({
  mapCenter,
  isMapClicked,
  setIsMapClicked,
  setMapCenter,
}) {
  const map = useMap();
  if (!isMapClicked) map.setView(mapCenter);
  else {
    setMapCenter(map.getCenter());
  }
  setIsMapClicked(false);
  return null;
}
