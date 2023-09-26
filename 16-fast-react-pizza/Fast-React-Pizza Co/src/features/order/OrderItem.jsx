import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex flex-wrap gap-4 text-sm  items-center justify-between ">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="capitalize text-stone-500 italic text-xs">
        {isLoadingIngredients ? "Loading ingredients..." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
