import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = "http://localhost:3001/cities";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  function getCity(id) {
    setIsLoading(true);
    const url = `http://localhost:3001/cities/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCurrentCity(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  function addCity(newCity) {
    let newCityId = null;
    setIsLoading(true);
    fetch("http://localhost:3001/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCity),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status >= 400 && data.status < 500)
          throw new Error(`Failed Adding The City!\n${data.message}`);

        setCities([...cities, data]);
        newCityId = data.id;
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
    return newCityId;
  }

  function deleteCity(id) {
    setIsLoading(true);
    const url = `http://localhost:3001/cities/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status >= 400 && data.status < 500)
          throw new Error(`Failed Deleting The City!\n${data.message}`);
        setCities(cities=> cities.filter((city)=> city.id !== id));
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities was used outside CitiesProvider!");
  return context;
}

export { CitiesProvider, useCities };
