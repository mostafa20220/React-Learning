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
        placeholder="Search by order ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-28 rounded-full border bg-yellow-100 px-4  py-1 text-stone-800 placeholder-opacity-75 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-2 sm:w-64 sm:focus:w-80  md:focus:w-96 placeholder:text-s"
      />
    </form>
  );
}

export async function loader({ params }) {
  console.log(params);
  return await getOrder(params.orderId);
}
