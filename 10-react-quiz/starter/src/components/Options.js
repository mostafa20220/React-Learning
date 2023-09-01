import { useQuiz } from "../contexts/QuizContext";

export function Options() {
  const  { questions, answer,index, dispatch } = useQuiz();
  const hasAnswered = answer !== null;
  const question = questions[index];
  return (
    <ul className="options">
      {question.options.map((option, i) => (
        <li key={option}>
          <button
            disabled={hasAnswered}
            className={`btn btn-option ${answer === i ? "answer" : ""} ${
              hasAnswered
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={dispatch.bind(null, {
              type: "ANSWER_QUESTION",
              payload: i,
            })}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}
