import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const initialState = {
  questions: [],
  status: "loading", // Possible States: loading, error, ready, active, finished;
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};


function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCUSS":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        status: "error",
      };

    case "START_QUIZ":
      return {
        ...state,
        status: "active",
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.points, state.highScore),
      };
    case "RESET_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };

    case "ANSWER_QUESTION":
      const currentQuestion = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const QuizContext = createContext();


export default function QuizProvider({ children }) {
  const [
    { status, questions, index, answer, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = useMemo(() => {
    return questions.reduce((acc, question) => acc + question.points, 0);
  }, [questions]);

  const numQuestions = questions.length;

  useEffect(() => {
    const URL = "http://localhost:3001/questions";
    fetch(URL)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH_SUCCUSS", payload: data }))
      .catch((error) => dispatch({ type: "FETCH_ERROR" }));
  }, [dispatch]);

  const quizContextValue = useMemo(() => {
    return {
      status,
      questions,
      index,
      answer,
      points,
      maxPoints,
      numQuestions,
      highScore,
      dispatch,
    };
  }, [
    status,
    questions,
    index,
    answer,
    points,
    maxPoints,
    numQuestions,
    highScore,
    dispatch,
  ]);

  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz(){
  const context = useContext(QuizContext);
  if(context === undefined){
    throw new Error('useQuiz was used outside the QuizProvider!')
  }
  return context;
}

export {QuizProvider, useQuiz};
