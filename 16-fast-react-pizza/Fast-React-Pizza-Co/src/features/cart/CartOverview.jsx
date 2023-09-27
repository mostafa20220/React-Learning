import { useSelector } from "react-redux";
import LinkButton from "../../ui/LinkButton";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { useLocation } from "react-router-dom";

function CartOverview() {
  const totalQuantity = useSelector(getTotalCartQuantity);

  const totalPrice = useSelector(getTotalCartPrice);


  const location = useLocation();

  // Access the pathname property to get the current route
  const currentRoute = location.pathname;

  if (currentRoute === "/cart") return null;


  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between lg:hidden bg-stone-800 p-4 uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
