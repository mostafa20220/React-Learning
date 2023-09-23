import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { Username } from "../features/user/Username";

export default function Header() {
  return (
    <header className="bg-yellow-400 uppercase text-stone-800 px-4 py-3 border-b-2 border-stone-200 sm:py-3 sm:px-6 sm:text-lg flex items-center justify-between">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
