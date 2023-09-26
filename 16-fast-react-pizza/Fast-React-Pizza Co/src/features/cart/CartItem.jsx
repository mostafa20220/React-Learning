import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "./cartSlice";
import DeleteItemBtn from "./DeleteItemBtn";
import UpdateItemQuantityBtns from "./UpdateItemQuantityBtns";

function CartItem({ item }) {
  const { pizzaId, name, quantity, unitPrice } = item;

  const totalPrice = quantity * unitPrice;

  return (
    <li className="flex  items-center justify-between py-3 text-sm font-normal  sm:text-base ">
      <div className="flex items-center gap-1.5">
      <span className="font-semibold">{quantity}&times;</span>
      <p className="">{name}</p>
      </div>
      <div className="flex items-center justify-center gap-6 font-semibold">
        <p>{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantityBtns pizzaId={pizzaId} />
        <span className="hidden sm:block">
          <DeleteItemBtn pizzaId={pizzaId} />
        </span>
      </div>
    </li>
  );
}

export default CartItem;
