import React from 'react'


export default function StartScreen({dispatch ,numQuestions}) {
  return (
    <div className='start'>
      <h2> Welcome to The React Quiz!</h2>
      <h3> {numQuestions} Questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={dispatch.bind(null, {type:"START_QUIZ"})}>Start Quiz</button>
    </div>
  )
}
