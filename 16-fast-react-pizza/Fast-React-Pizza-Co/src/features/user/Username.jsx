import React from "react";
import { useSelector } from "react-redux";
import { getUsername } from "../cart/cartSlice";

export function Username() {

  const username = useSelector(getUsername);

  if(!username) return null;

  return <p className="font-semibold lg:text-xl hidden sm:block">{username}</p>;
}
