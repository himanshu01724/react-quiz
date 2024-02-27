import { useReducer } from "react";


const initialState = {count:0, step:1}; 

function reducer(state, action){
  console.log(state,action)
  switch(action.type){
      case "increasing":
        return {...state, count: state.count + state.step}
      case "decreasing":
        return {...state, count: state.count - state.step}
      case "setState":
        return {...state, count: action.payload}
      case "setStep":
        return {...state, step:action.payload}
      case "reset":
        return initialState
      default:
        throw new Error('Unknown Action')
  }
}


function DateCounter() {


  const [state,dispatch] = useReducer(reducer, initialState);

  const {count,step} = state;




  // This mutates the date object.
  const date = new Date("february 26 2024");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:'decreasing'})
  };

  const inc = function () {
    dispatch({type:'increasing'})
  };

  const defineCount = function (e) {
    dispatch({type:'setState', payload:Number(e.target.value)})
  };

  const defineStep = function (e) {
    dispatch({type: 'setStep', payload:Number(e.target.value)})
  };

  const reset = function () {
    dispatch({type:'reset'})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
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