import React, { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/citiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import {useUrlPosition} from "../hooks/useUrlPosition";

export default function Map() {
  const [lat, lng] = useUrlPosition();
  const [mapPosition, setMapPosition] =  useState([lat || 51.505,lng || -0.09]);
  const {cities} = useCities();
  const { position: geolocationPosition, isLoading: isGeolocationLoading, error, getPosition } = useGeolocation(setMapPosition);

  useEffect(() => {
    if(lat && lng) setMapPosition([lat,lng]);
  }, [lat,lng]);


  return (
    <div className={styles.mapContainer}>
        
        {
          !geolocationPosition &&
          <Button type='position' onClick={getPosition.bind()} >
          {isGeolocationLoading ? "Loading..." : "Use Your Position"}
        </Button>
        }
          <MapContainer center={mapPosition} zoom={5} scrollWheelZoom={true} className={styles.map}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {
              cities.map(city => 
                <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span> {city.emoji}</span> 
                <span> {city.cityName} <br/>
                {city.notes} </span>
              </Popup>
            </Marker>
              )
            }
            <ChangeMapCenter position={mapPosition} />
            <DetectMapClicks />
          </MapContainer>
        
    </div>
  );
}

function DetectMapClicks(){
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => 
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  return null;
}

function ChangeMapCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}