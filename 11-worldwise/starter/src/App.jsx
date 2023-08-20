import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

export default function App() {
  
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = "http://localhost:3001/cities"
    fetch(url).then(response => response.json()).then(data => setCities(data)).catch(error => console.error(error)).finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="app" element={<AppLayout />} >
            <Route index element={<Navigate replace to="cities"/>} />
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
              <Route path="cities/:id" element={<City/>}/>
            <Route path="countries" element={<CountryList cities={cities} />} />
            <Route path="form" element={<Form/>} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
