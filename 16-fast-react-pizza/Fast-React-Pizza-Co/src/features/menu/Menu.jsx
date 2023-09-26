import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useState } from "react";

//* there 2 fetching data approaches:
// 1- using React-Router "fetch as you render" approach  //!(Recommended)
// 2- using useEffect hook "fetch on render" approach which cause waterfall effect //!(Not Recommended)

function Menu() {
  const menu = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = menu.filter(
    (pizza) =>
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.ingredients.join(" ").toLowerCase().includes(searchQuery),
  );

  return (
    <div className="px-2 flex flex-col h-[90%]">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="placeholder:text-s my-2 w-full rounded-full border  bg-stone-200 px-4 py-1 text-stone-800 placeholder-opacity-75 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-2 sm:px-4 sm:py-1 "
      />

      {!searchResults.length ? (
        <p className="self-center text-stone-800 capitalize sm:text-lg my-auto ">No pizzas found!</p>
      ) : (
        <ul className="">
          {searchResults.map((item) => (
            <MenuItem key={item.id} pizza={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
