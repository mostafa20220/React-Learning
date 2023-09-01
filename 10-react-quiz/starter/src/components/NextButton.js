import React from 'react'
import { useQuiz } from '../contexts/QuizContext';

export default function NextButton() {
  const {dispatch, answer, index, numQuestions} = useQuiz();
  
  if (answer === null) return null;

  let btnText= "Next Question";
  let dispatchType="NEXT_QUESTION";

  if(index === numQuestions - 1 ) // if last question
  {
    btnText = "Finish";
    dispatchType="FINISH_QUIZ";
  }

  return (
    <button className='btn btn-ui' onClick={dispatch.bind(null, {type:dispatchType})}> {btnText} </button>
    
    )

  
}
