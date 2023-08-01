import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from  "./App";
import {StarRating} from "./components/StarRating"

function Test() {
  const [rating, setRating] = React.useState(0);
  return (
    <div>
      <StarRating color="red" size={70} onSetRating={setRating}></StarRating>
      <h3> You Chosed {rating} starts </h3>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
);