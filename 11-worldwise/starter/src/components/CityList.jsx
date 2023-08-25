import React from "react";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem  from "./CityItem";
import Message  from "./Message";

export default function CityList({ cities ,isLoading }) {

  if (isLoading) return <Spinner/>;

  if(cities.length === 0) return (
    <Message message="To get started, add a city by clicking on a city on the map"/>
  );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city}></CityItem>
      ))}
    </ul>
  );
}