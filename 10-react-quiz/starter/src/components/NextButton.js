import React from 'react'

export default function NextButton({dispatch, answer, index, numQuestions}) {
  
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
