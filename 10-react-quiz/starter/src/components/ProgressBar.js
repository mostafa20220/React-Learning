import React from 'react'
import { useQuiz } from '../contexts/QuizContext';

export default function ProgressBar() {
  const {maxPoints, points ,answer, index, numQuestions} = useQuiz();
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + +(answer!==null)}></progress>
      <p> Question <strong>{index + 1} </strong>/ {numQuestions} </p>
      <p> <strong>{points}</strong>  / {maxPoints} </p>
      </header>
  )
}
