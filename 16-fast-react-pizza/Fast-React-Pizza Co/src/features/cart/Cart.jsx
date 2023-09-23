import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetables",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="text-stone-800 font-medium p-3">
      <LinkButton
        to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-6 mb-4 text-2xl">Your cart, %NAME%</h2>

      <ul className="divide-y border-b mb-6">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button type='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
