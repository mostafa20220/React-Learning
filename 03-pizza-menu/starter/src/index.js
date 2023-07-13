import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />

      <Menu />

      <Footer />
    </div>
  );
}

function Menu() {
  console.log(pizzaData);

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* {
        pizzaData.length > 0  &&
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
      </ul>
        } */}

      {pizzaData.length ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu. Come and check later (:</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        photoPath="pizzas/spinaci.jpg"
        ingredients="Tomato, mozzarella, spinach, and ricotta cheese"
        price={10}
      />
      <Pizza
        name="Pizza funghi"
        photoPath="pizzas/funghi.jpg"
        ingredients="Tomato, mushrooms"
        price={12}
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p> {pizzaObj.ingredients}</p>
        <span> {pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price} </span>
      </div>
    </li>
  );
}

function Header() {
  // const style={
  //   color: "red",
  //   fontSize:"48px",
  //   textTransform: "uppercase",
  // };

  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza co.</h1>;
    </header>
  );
}

function Footer() {
  // 12 - 22
  const openHour = 12;
  const closeHour = 22;
  const hourNow = new Date().getHours();

  const isOpen = hourNow >= openHour && hourNow <= closeHour;

  return (
    <footer className="footer">
      {/* {isOpen && (
        <div className="order">
          <p>
            We are open until {closeHour}:00. Come visit us or order online.
          </p>
          <button className="btn"> Order Now </button>
        </div>
      )} */}

      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We 're happy to welcome you between {openHour}:00 and {closeHour}:00.{" "}
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We are open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn"> Order Now </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
