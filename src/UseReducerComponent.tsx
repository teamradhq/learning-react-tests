/**
 * Demonstrates useReducer component hook.
 * @module UseReducerComponent
 * @see module:useReducerTest
 */
import React, { useReducer } from 'react';

interface UseReducerState {
  counter: number;
  message: string;
}

/**
 * Reducer can perform reset, increment
 * and message actions.
 *
 * @see {@link reducer}
 * @see {@link UseContextComponent}
 *
 *  Actions:
 *
 *  @example
 *    { type: 'message', payload: 'new' }
 *    // Updates {message} with {payload}.
 *  @example
 *    { type: 'increment' }
 *    // Increments {counter} and updates {message}.
 *  @example
 *    {type: 'reset'}
 *    // Sets {initialState}.
 */
export type ReducerAction =
| { type: 'message', payload: string }
| { type: 'reset' }
| { type: 'increment' }

const initialState: UseReducerState = {
  counter: 0,
  message: 'start',
};

/**
 * Reducer performs {action} on {oldState}
 * and returns new {state}.
 *
 *
 * @param {UseReducertState} oldState State before action was dispatched.
 * @param {ReducerAction}    action   Dispatch action.
 *
 * @example
 *  const [state, dispatch] = useReducer(
 *    reducer,
 *    initialState
 *  );
 *
 *  dispatch({ type: 'increment' });
 *  // {  counter: 1, message: 'nice' }
 *
 *  dispatch({ type: 'reset', });
 *  // {  counter: 0, message: 'start' };
 *
 *  dispatch({ type: 'message',  payload: 'new' });
 *  // {  counter: 0, message: 'new' };
 *
 *
 * @see {@link UseReducerComponent}
 * @see {@link ReducerAction}
 *
 * @returns {UseReducerState} New state.
 */
function reducer(
  oldState: UseReducerState,
  action: ReducerAction,
): UseReducerState {
  if (action.type === 'reset') {
    return { ...initialState };
  }

  if (action.type === 'message' && action.payload) {
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
    state.message = 'start';
  } else if (state.counter === 1) {
    state.message = 'nice';
  } else if (state.counter === 3) {
    state.message = 'rad';
  }

  return state;
}

/**
 * Component can dispatch reset, message, and
 * increment actions.
 *
 * @see reducer
 * @see ReducerAction
 *
 * @returns {JSX.Element} UseReducerComponent
 */
export function UseReducerComponent(): JSX.Element {
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
