export default function ResultScreen({ maxPoints, points, highScore, dispatch }) {
  const percentage = Math.round((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "💥";
  else if (percentage >= 90) emoji = "💥";
  else if (percentage >= 80) emoji = "💥";
  else if (percentage >= 70) emoji = "💥";
  else if (percentage >= 60) emoji = "💥";
  else if (percentage >= 50) emoji = "💥";
  else emoji = "";

  return (
    <>
      <p className="result">
        <span> {emoji} </span> You scored <strong>{points}</strong> out of{" "}
        <strong>{maxPoints}</strong> ({percentage}%)
      </p>
      <p className="highscore"> (HighScore: {highScore} points) </p>

    <button className='btn btn-ui' onClick={dispatch.bind(null, {type:"RESET_QUIZ"})}> Restart The Quiz  </button>
    
    </>
  );
}
