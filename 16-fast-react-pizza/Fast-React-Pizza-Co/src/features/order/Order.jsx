// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import CartItem from "../cart/CartItem";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrderBtn from "./UpdateOrderBtn";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const order = useLoaderData();

  const fetcher = useFetcher();


  useEffect(()=>{
      fetcher.load('/menu');
  },[]);

  const isLoadingIngredients = fetcher.state === "loading";

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
    <div className="px-4 space-y-8 mx-auto max-w-4xl  font-medium lg:h-fit  ">
      <div className="flex items-center flex-wrap justify-between gap-4 ">
        <h2 className="font-semibold text-xl lg:text-3xl "> Order #{id} status</h2>

        <div className="flex items-center gap-2 text-sm lg:text-lg ">
          {priority && <span className="bg-red-500 rounded-full text-red-50 px-3 py-1    font-semibold uppercase tracking-wide ">Priority</span>}
          <span className="bg-green-500 rounded-full text-red-50 px-3 py-1 font-semibold uppercase tracking-wide ">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 lg:text-xl  items-center justify-between bg-stone-200 py-5 px-6 ">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs lg:text-base text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

        <ul className="divide-y border-b border-t divide-stone-200">
          {cart.map((item) => <OrderItem key={item.pizzaId} item={item} isLoadingIngredients={isLoadingIngredients} ingredients={fetcher?.data?.find(el=>el.id===item.pizzaId).ingredients} /> )}
        </ul>

      <div className="bg-stone-200 py-5 text-sm lg:text-base px-6 space-y-2">
        <p className="font-medium  text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="font-medium  text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold text-base lg:text-lg">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {
        !priority &&
        <UpdateOrderBtn/>
      }
    </div>
  );
}

export default Order;
