import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItemToCart, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItemBtn from "../cart/DeleteItemBtn";
import UpdateItemQuantityBtns from "../cart/UpdateItemQuantityBtns";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart(e) {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
    };
    
    dispatch(addItemToCart(newItem));
  }

  return (
    <li
      className={`flex gap-4 lg:flex-col lg:max-w-full border-b-2 border-collapse py-1.5 ${
        soldOut ? "opacity-80 grayscale" : ""
      } `}
    >
      <img src={imageUrl} alt={name} className="h-24 w-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-full lg:h-full rounded-lg" />
      <div className="flex flex-1 flex-col py-1">
        <p className="font-semibold sm:text-base lg:text-xl text-sm">{name}</p>
        <p className="text-xs sm:text-sm lg:text-lg mb-2 lg:mb-4  sm:mb-0 capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="first-letter lg:text-lg mt-auto flex flex-wrap gap-2 items-center justify-between text-sm font-semibold uppercase text-stone-500 ">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          {currentQuantity ? (
            <div className="flex gap-6">
            <UpdateItemQuantityBtns pizzaId={id} />
            <span className="hidden sm:block lg:hidden">
            <DeleteItemBtn pizzaId={id} />
            </span>
            </div>
          ) : (
            !soldOut && (
              <Button onClick={handleAddToCart} size="small">
                Add To Cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
