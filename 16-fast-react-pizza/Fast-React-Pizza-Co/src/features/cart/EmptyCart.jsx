import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="py-3 text-center">
      <p className="mt-7 font-semibold">
        Your cart is empty.<br/> Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
