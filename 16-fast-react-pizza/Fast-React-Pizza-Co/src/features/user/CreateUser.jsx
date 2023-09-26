import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../cart/cartSlice";

function CreateUser() {
  const [username, setUsername] = useState("");

  const savedUsername = useSelector(getUsername);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const btnContent = !savedUsername
    ? "Start ordering"
    : !username
    ? `Continue Ordering, ${savedUsername}`
    : "Change Name";

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUsername(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="px-2 w-full">
      <p className="text-md mb-8 md:text-base lg:text-4xl">👋 Welcome!</p>

      {/* <label htmlFor="username"> Your Name </label> */}
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="lg:text-4xl lg:max-w-xl lg:py-6 lg:px-16 lg:mb-12 input mb-4 max-w-xs"
        name="username"
      />

      <div>
        <Button size="large" >{btnContent}</Button>
      </div>
    </form>
  );
}

export default CreateUser;
