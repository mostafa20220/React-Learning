import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { Username } from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-stone-200 bg-yellow-400 px-4 py-3 uppercase text-stone-800 sm:px-6 sm:py-3 sm:text-lg lg:text-3xl lg:py-4">
      <Link to="/" className="tracking-widest">
        Fast Pizza Co
      </Link>
      <div className="flex items-center gap-4 md:gap-8">
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}
