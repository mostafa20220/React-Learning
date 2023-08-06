import React from 'react'

export default function ProgressBar({maxPoints, points ,answer, index, numQuestions}) {
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + +(answer!==null)}></progress>
      <p> Question <strong>{index + 1} </strong>/ {numQuestions} </p>
      <p> <strong>{points}</strong>  / {maxPoints} </p>
      </header>
  )
}
