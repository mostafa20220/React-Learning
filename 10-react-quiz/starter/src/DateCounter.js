import { useReducer } from "react";


function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return {...state, count: state.count + state.step};
    case 'DEC':
      return {...state, count: state.count - state.step};
    case 'SET_COUNT':
      return {...state, count: action.payload};
    case 'SET_STEP':
      return {...state, step: action.payload};
    case 'RESET':
      return {count:0,step:1};
      default:
      throw new Error();
  }
}

function DateCounter() {

  const initialState = {count:0,step:1};
  const [state, dispatch] = useReducer(reducer, initialState);

  const date = new Date();
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({type:'DEC'});
  };

  const inc = function () {
    dispatch({type:'INC'});
  };

  const defineCount = function (e) {
    dispatch({type:'SET_COUNT',payload:Number(e.target.value)});
  };

  const defineStep = function (e) {
    dispatch({type:'SET_STEP',payload:Number(e.target.value)});
  };

  const reset = function () {
    dispatch({type:'RESET'});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
