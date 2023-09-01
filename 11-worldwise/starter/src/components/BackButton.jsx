import Button from "./Button";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate("/app");
      }}
    >
      &larr; Back
    </Button>
  );
}
