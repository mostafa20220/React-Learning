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

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetable",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionErrorsObj = useActionData();

  return (
    <div className="p-4 font-medium">
      <h2 className="mb-8 text-xl ">Ready to order? Let's go!</h2>

      {/* <Form method="POST" > */}
      <Form method="POST" action="/order/new">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input className="input" type="text" name="customer" required />
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
          <div className="grow">
            <input type="text" name="address" required className="input" />
          </div>
        </div>

        <div className="mb-8 flex items-center gap-6">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
          />
          <label className="text-lg font-bold" htmlFor="priority">
            want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "placing order..." : "order now"}
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

  // creating the order object
  const order = {
    ...formDataObj,
    cart: JSON.parse(formDataObj.cart),
    priority: formDataObj.priority === "on",
  };

  // error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length) return errors;

  // if no errors, place the order
  const newOrder = await createOrder(order);

  // navigate to the new order page
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
