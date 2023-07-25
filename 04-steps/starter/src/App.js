import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {

  const [step, setStep] = useState(1);
  const [isOpened, setIsOpened] = useState(true);

  const handleNext = () => {
    step < 3 && setStep(step + 1);
  };

  const handlePrevious = () => {
    step > 1 && setStep(step - 1);
  };



  return (
    <>
      <button className="close" onClick={() => setIsOpened(!isOpened)}> &times; </button>
      {isOpened &&
        <article className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""} > 1 </div>
            <div className={step >= 2 ? "active" : ""} > 2 </div>
            <div className={step >= 3 ? "active" : ""} > 3 </div>
          </div>

          <div className="buttons">
            <Step step={step}>
              {messages[step - 1]}
              <Button> Learn How ? </Button>
            </Step>
          </div>


          <div className="buttons">
            <Button onClick={handlePrevious} textColor="#fff" bgColor="#7950f2" >
              <span>👈 </span> Previous
            </Button>

            <Button onClick={handleNext} textColor="#fff" bgColor="#7950f2" >
              Next <span>👉 🧐</span>
            </Button>

          </div>
        </article>
      }
    </>
  );
}

function Step({ children, step }) {

  return (
    <div className="message">
      <h3>
        Step {step}:
      </h3>
      {children}
    </div>


  );

}

function Button({ children, onClick, textColor, bgColor }) {

  return (
    <button onClick={onClick} style={{ color: textColor, backgroundColor: bgColor }} > {children} </button>
  );

}