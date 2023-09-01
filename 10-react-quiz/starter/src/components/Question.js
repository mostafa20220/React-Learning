import { useQuiz } from "../contexts/QuizContext";
import { Options } from "./Options";

export default function Question() {
  const {questions,index} = useQuiz();
  // console.log(questions); 
  const question = questions[index].question;
  return (
    <div>
      <h4>{question}</h4>
      <Options/>
    </div>
  );
}