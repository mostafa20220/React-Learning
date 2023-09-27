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
    if (username) dispatch(updateUsername(username));
    navigate("/menu");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 px-2 lg:space-y-8"
    >
      <p className="text-md  md:text-base lg:text-4xl">👋 Welcome!</p>

      {/* <label htmlFor="username"> Your Name </label> */}
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input    max-w-xs lg:max-w-lg lg:px-16 lg:py-6 lg:text-3xl"
        name="username"
      />

      <div className={`${!username && !savedUsername ? "scale-0" : ""}`}>
        <Button size="">{btnContent}</Button>
      </div>
    </form>
  );
}

export default CreateUser;
