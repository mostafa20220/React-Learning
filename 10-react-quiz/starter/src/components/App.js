import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import ResultScreen from "./ResultScreen";
import Footer from "./Footer";

const SECONDS_PER_QUESTION = 10;

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

function Timer({ dispatch, numQuestions }) {
  const [remainingSeconds,setRemainingSeconds] = useState(SECONDS_PER_QUESTION * numQuestions);

  if (remainingSeconds === 0) {
    dispatch({ type: "FINISH_QUIZ" });
  }

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  useEffect(() => {
    const ticID = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(ticID);
    };
  }, [dispatch]);

  return (
    <p className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}{" "}
    </p>
  );
}

export default function App() {
  const [
    { status, questions, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const numQuestions = questions.length;

  useEffect(() => {
    const URL = "http://localhost:3001/questions";
    fetch(URL)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH_SUCCUSS", payload: data }))
      .catch(
        (error) => dispatch({ type: "FETCH_ERROR" })
        // dispatch({ type: "FETCH_SUCCUSS", payload: DATA })
      );
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              answer={answer}
              index={index}
              points={points}
              maxPoints={maxPoints}
              numQuestions={numQuestions}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            ></Question>
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
              <Timer numQuestions={numQuestions} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <ResultScreen
            maxPoints={maxPoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

/*
const DATA = [
  {
    question: "Which is the most popular JavaScript framework?",
    options: ["Angular", "React", "Svelte", "Vue"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which company invented React?",
    options: ["Google", "Apple", "Netflix", "Facebook"],
    correctOption: 3,
    points: 10,
  },
  {
    question: "What's the fundamental building block of React apps?",
    options: ["Components", "Blocks", "Elements", "Effects"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "What's the name of the syntax we use to describe the UI in React components?",
    options: ["FBJ", "Babel", "JSX", "ES2015"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "How does data flow naturally in React apps?",
    options: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
  },
  {
    question: "How to pass data into a child component?",
    options: ["State", "Props", "PropTypes", "Parameters"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "When to use derived state?",
    options: [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question: "What triggers a UI re-render in React?",
    options: [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements",
    ],
    correctOption: 2,
    points: 20,
  },
  {
    question: 'When do we directly "touch" the DOM in React?',
    options: [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never",
    ],
    correctOption: 3,
    points: 20,
  },
  {
    question: "In what situation do we use a callback to update state?",
    options: [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question:
      "If we pass a function to useState, when will that function be called?",
    options: [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question:
      "Which hook to use for an API request on the component's initial render?",
    options: ["useState", "useEffect", "useRef", "useReducer"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which variables should go into the useEffect dependency array?",
    options: [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question: "An effect will always run on the initial render.",
    options: [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect",
    ],
    correctOption: 0,
    points: 30,
  },
  {
    question: "When will an effect run if it doesn't have a dependency array?",
    options: [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered",
    ],
    correctOption: 3,
    points: 20,
  },
];

*/
