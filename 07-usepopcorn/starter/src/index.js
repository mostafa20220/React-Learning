import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from  "./App";
import Stars from "./StarsRating"

function Test() {
  const [rating, setRating] = React.useState(0);
  return (
    <div>
      <Stars color="red" size={70} onSetRating={setRating}></Stars>
      <h3> You Chosed {rating} starts </h3>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <Stars />

    <Stars size={40} color="blue" maxRating={10} ></Stars>

    <Test></Test>

  </React.StrictMode>
);