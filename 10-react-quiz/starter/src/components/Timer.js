import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

const SECONDS_PER_QUESTION = 10;
export function Timer() {
  const { numQuestions, dispatch } = useQuiz();
  const [remainingSeconds, setRemainingSeconds] = useState(
    SECONDS_PER_QUESTION * numQuestions
  );

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  useEffect(() => {
    
    const ticID = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(ticID);
    };
  }, []);

useEffect(() => {
    if (remainingSeconds === 0) {
      dispatch({ type: "FINISH_QUIZ" });
    }
},[remainingSeconds])

  return (
    <p className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </p>
  );
}
