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
      className={`flex border-collapse gap-4 border-b-2 py-1.5 lg:max-w-full lg:flex-col ${
        soldOut ? "opacity-80 grayscale" : ""
      } `}
    >
      <img
        src={imageUrl}
        alt={name}
        className="lg:w-full lg:h-auto h-24 w-24 rounded-lg sm:h-32 sm:w-32 md:h-48   md:w-48"
      />
      <div className="flex flex-1 flex-col py-1">
        <p className="text-sm font-semibold sm:text-base lg:text-xl">{name}</p>
        <p className="mb-2 text-xs capitalize italic text-stone-500  sm:mb-0 sm:text-sm lg:mb-4 lg:text-base">
          {ingredients.join(", ")}
        </p>
        <div className="first-letter mt-auto flex flex-wrap items-center justify-between gap-2 text-sm font-semibold uppercase text-stone-500 lg:text-lg ">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}

          {currentQuantity ? (
            <div className="flex items-center gap-6">
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
