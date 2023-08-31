import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "error":
      console.error(action.payload); //! TODO: Remove this line in production
      return { ...state, error: action.payload, isLoading: false };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/added":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    const url = "http://localhost:3001/cities";
    fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "cities/loaded", payload: data }))
      .catch((error) => dispatch({ type: "error", payload: error }));
  }, []);

  function getCity(id) {
    if(+id === +currentCity.id) return;
    dispatch({ type: "loading" });
    const url = `http://localhost:3001/cities/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "city/loaded", payload: data }))
      .catch((error) => dispatch({ type: "error", payload: error }));
  }

  function addCity(newCity) {
    dispatch({ type: "loading" });
    fetch("http://localhost:3001/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCity),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status >= 400 && data.status < 500)
          throw new Error(`Failed Adding The City!\n${data.message}`);

        dispatch({ type: "city/added", payload: data });
      })
      .catch((error) => dispatch({ type: "error", payload: error }));
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });
    const url = `http://localhost:3001/cities/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status >= 400 && data.status < 500)
          throw new Error(`Failed Deleting The City!\n${data.message}`);
        dispatch({ type: "city/deleted", payload: id });
      })
      .catch((error) => dispatch({ type: "error", payload: error }));
  }

  return (
    <CitiesContext.Provider
      value={{ cities, currentCity ,isLoading, error, getCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities was used outside CitiesContext!");
  return context;
}

export { CitiesProvider, useCities };
