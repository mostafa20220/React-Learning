// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import CartItem from "../cart/CartItem";
import OrderItem from "./OrderItem";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <h2 className="font-semibold text-xl "> Order #{id} status</h2>

        <div className="flex items-center gap-2 ">
          {priority && <span className="bg-red-500 rounded-full text-red-50 px-3 py-1 text-sm font-semibold uppercase tracking-wide ">Priority</span>}
          <span className="bg-green-500 rounded-full text-red-50 px-3 py-1 text-sm font-semibold uppercase tracking-wide ">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between bg-stone-200 py-5 px-6 ">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

        <ul className="divide-y border-b border-t divide-stone-200">
          {cart.map((item) => <OrderItem key={item.pizzaId} item={item} /> )}
        </ul>

      <div className="bg-stone-200 py-5 px-6 space-y-2">
        <p className="font-medium text-sm text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="font-medium text-sm text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export default Order;
