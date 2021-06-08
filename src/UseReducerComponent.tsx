import React, { useReducer } from 'react';

const initialState = {
  counter: 0,
  message: 'start',
};

function reducer(oldState, action) {
  if (action.type === 'reset') {
    return { ...initialState };
  }

  if (action.type === 'message') {
    return {
      ...oldState,
      message: action.payload,
    };
  }

  const state = {
    counter: oldState.counter + 1,
    message: oldState.message,
  };

  if (state.counter === 0) {
    state.message = 'start'
  } else if (state.counter === 1) {
    state.message = 'nice'
  } else if (state.counter === 3) {
    state.message = 'rad'
  }

  return state;
}

export function UseReducerComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const increment = () => dispatch({ type: 'increment' });
  const reset = () => dispatch({ type: 'reset' });
  const message = (payload) => dispatch({ type: 'message', payload });

  return (
    <div data-testid="render">
      <div data-testid="message">{state.message}</div>
      <div data-testid="counter">{state.counter}</div>
      <button data-testid="increment" onClick={increment}>Increment</button>
      <button data-testid="reset" onClick={reset}>Reset</button>
      <button data-testid="updateMessage" onClick={() => message('update')}>Message</button>
    </div>
  );
}
