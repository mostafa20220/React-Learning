import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import PricingPage from "./pages/PricingPage";
import PageNotFound from "./pages/PageNotFound";

function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="product" element={<ProductPage/>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="pricing" element={<PricingPage/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
