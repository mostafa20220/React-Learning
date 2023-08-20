import React from "react";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return (
      <Message message="To get started, add a city by clicking on a city on the map" />
    );


  const countries = cities.reduce((acc, city) => {
    const country = acc.find((item) => item.name === city.country);
    if (!country) {
      acc.push({
        id: city.id,
        name: city.country,
        emoji: city.emoji,
      });
    }
    return acc;
  }, []);


  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country}></CountryItem>
      ))}
    </ul>
  );
}