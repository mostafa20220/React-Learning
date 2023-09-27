import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1 lg:space-x-3 lg:px-4">
      <div className="flex gap-4 text-sm  lg:text-lg items-center justify-between ">
        <div>

        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
      <p className="capitalize text-stone-500 italic lg:text-base text-xs">
        {isLoadingIngredients ? "Loading ingredients..." : ingredients?.join(", ")}
      </p>
        </div>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
