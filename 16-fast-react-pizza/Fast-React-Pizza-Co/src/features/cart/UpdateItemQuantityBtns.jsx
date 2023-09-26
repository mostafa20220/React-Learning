import React from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

export default function UpdateItemQuantityBtns({pizzaId}) {
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  const dispatch = useDispatch();

  function handleIncreaseQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreaseQuantity() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2  sm:gap-3">
      <Button onClick={handleDecreaseQuantity} size="rounded">
        -
      </Button>
      <span className="font-semibold text-sm sm:text-base ">{currentQuantity}</span>
      <Button onClick={handleIncreaseQuantity} size="rounded">
        +
      </Button>
    </div>
  );
}
