export function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

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
