import React, { useState } from "react";
import { getOrder } from "../../services/apiRestaurant";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`/order/${searchQuery}`);
    setSearchQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by order Id"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg  lg:placeholder:text-2xl w-28 rounded-full border bg-yellow-100  px-4 py-1 text-stone-800 placeholder-opacity-75 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-0 sm:w-52 sm:focus:w-60 md:w-64 md:focus:w-80 lg:py-2 lg:w-80 lg:focus:w-96 [1280px]:w-96 [1280px]:focus:w-[35rem]"
      />
    </form>
  );
}

export async function loader({ params }) {
  return await getOrder(params.orderId);
}
