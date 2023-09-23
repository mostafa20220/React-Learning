import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex justify-between items-center py-3 font-normal">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex gap-6 justify-center items-center font-semibold">
        <p>{formatCurrency(totalPrice)}</p>
        <Button size="small"> Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
