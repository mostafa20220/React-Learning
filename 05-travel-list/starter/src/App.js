import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {

  const [step,setStep] = useState(1);
  const [isOpened, setIsOpened] = useState(true);

  const handleNext = () => {
    step < 3 && setStep(step + 1)
  }
  
  const handlePrevious = () => {
    step > 1 && setStep(step - 1)
  }



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
      <div className="message"> Step {step}: {messages[step - 1]} </div>
      <div className="buttons">
        <button style={{ color: "#fff", backgroundColor: "#7950f2" }} 
        onClick={handlePrevious} 
        >
          Previous
        </button>
        <button style={{ color: "#fff", backgroundColor: "#7950f2" }} 
        onClick={handleNext} 
        >
          {" "}
          Next
        </button>
      </div>
    </article>
        }
          </>
  );
}
