import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className={`flex gap-4 py-1.5 px-2 border-b-2 ${soldOut ? "grayscale opacity-80" : "" } `}>
      <img src={imageUrl} alt={name} className="w-24 h-24" />
      <div className="flex flex-col py-1 flex-1">
        <p className="font-semibold">{name}</p>
        <p className="italic text-sm capitalize text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto uppercase text-sm font-medium text-stone-500 first-letter flex justify-between items-center">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          <Button disabled={soldOut} size='small'> Add To Cart </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
