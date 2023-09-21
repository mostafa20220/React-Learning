import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

//* there 2 fetching data approaches:
// 1- using React-Router "fetch as you render" approach  //!(Recommended)
// 2- using useEffect hook "fetch on render" approach which cause waterfall effect //!(Not Recommended)

function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((item) => (
        <MenuItem key={item.id} pizza={item} />
      ))}
    </ul>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
