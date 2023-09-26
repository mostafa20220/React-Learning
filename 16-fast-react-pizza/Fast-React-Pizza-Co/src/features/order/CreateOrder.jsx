import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, updateUsername } from "../user/userSlice";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  getUsername,
} from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { getAddress } from "../../services/apiGeocoding";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  const {username, error, status:gettingAddressStatus, address, position } = useSelector(state => state.user);

  const isLoadingAddress =  gettingAddressStatus === "loading";


  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionErrorsObj = useActionData();

  const totalPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalWithPriority = totalPrice + priorityPrice;


  function handleGetCurrentAddress(e){
    e.preventDefault();
    dispatch(fetchAddress());
  }


  if(cart.length === 0) return <EmptyCart/>;

  return (
    <div className="p-4 font-medium">
      <h2 className="mb-8 text-xl ">Ready to order?<br/> Let's go!</h2>

      {/* <Form method="POST" > */}
      <Form method="POST" action="/order/new">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {actionErrorsObj?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {actionErrorsObj.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input type="text" name="address" defaultValue={address}  required disabled={isLoadingAddress} className="input" />
            {
              !position?.latitude && !position?.longitude &&
              <span className="absolute right-1 top-[4.5px] sm:top-0.5 sm:right-0.5 z-50">
            <Button size="small" disabled={isLoadingAddress} onClick={handleGetCurrentAddress}>Get Current Address</Button>
            </span>
            }
          {error && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center gap-6">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
          />
          <label className="text-lg font-bold" htmlFor="priority">
            want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input type="hidden" name="position" value={JSON.stringify(position)} />

        <div>
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "placing order..."
              : `order now for ${formatCurrency(totalWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // getting data from the form
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData.entries());

  const cart = JSON.parse(formDataObj.cart);
  // cart.forEach((item) => {item.pizzaId=item.id; delete item.id;});

  // creating the order object
  const order = {
    ...formDataObj,
    cart,
    priority: formDataObj.priority === "true",
  };

  // error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length) return errors;

  // if no errors, place the order
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  // navigate to the new order page
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
