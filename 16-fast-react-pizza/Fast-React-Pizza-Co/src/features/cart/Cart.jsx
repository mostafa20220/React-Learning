import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getUsername } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="text-stone-800 font-medium p-3">
      <LinkButton
        to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-6 mb-4 text-2xl">Your Cart{username ? ", " + username : ""}</h2>

      <ul className="divide-y border-b mb-6">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button onClick={handleClearCart} type='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
