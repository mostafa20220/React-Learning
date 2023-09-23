import LinkButton from "../../ui/LinkButton";

function CartOverview() {
  return (
    <div className="bg-stone-800 text-stone-200 uppercase flex items-center justify-between p-4 sm:px-6 md:text-base">
      <p className="text-stone-300 font-semibold space-x-3 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
