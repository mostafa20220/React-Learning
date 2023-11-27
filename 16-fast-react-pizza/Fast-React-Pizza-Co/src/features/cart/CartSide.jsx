import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
  getUsername,
} from "./cartSlice";
import EmptyCart from "./EmptyCart";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

export default function CartSide() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalPrice = useSelector(getTotalCartPrice);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length)
    return (
      <div className="hidden lg:block">
        <EmptyCart />
      </div>
    );

  return (
    <aside className="hidden h-fit rounded-lg bg-stone-200 px-3 pt-6 text-center font-medium text-stone-800 lg:sticky lg:right-1 lg:top-1 lg:block">
      <h2 className="mb-4 text-2xl">🛒 Your Cart</h2>

      <div className="flex items-center justify-between px-2 py-4 font-semibold lg:text-lg ">
        <p className="">{totalCartQuantity}&times; Pizzas</p>
        <p className="">{formatCurrency(totalPrice)} </p>
      </div>

      <ul className="divide-y divide-stone-400 border-y border-stone-400 ">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-center gap-3 py-4">
        <Button to="/order/new" size="medium">
          Order pizzas
        </Button>
        <Button size="medium" onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </aside>
  );
}
