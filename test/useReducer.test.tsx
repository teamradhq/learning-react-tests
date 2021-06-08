import React, { useReducer } from 'react';
import { render, fireEvent } from "@testing-library/react";

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

function RenderComponent() {
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

function renderComponent() {
  return render(<RenderComponent />);
}

describe('useReducer', () => {
  let getByTestId;

  beforeEach(() => {
    getByTestId = renderComponent().getByTestId;
  });

  it.each([
    ['start', 0],
    ['nice', 1],
    ['nice', 2],
    ['rad', 3],
    ['rad', 4],
  ])('message should be "%s" after %s increments', async (text, n) => {
    expect.assertions(2);

    const increment = await getByTestId('increment');
    for (let i = 0; i < n; i++) {
      fireEvent.click(increment);
    }

    const message = await getByTestId('message');
    const counter = await getByTestId('counter');
    expect(counter).toContainHTML(String(n));
    expect(message).toContainHTML(text);
  });

  it('should initialise values on reset', async () => {
    expect.assertions(2);

    const increment = await getByTestId('increment');
    const reset = await getByTestId('reset');
    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(reset);

    const message = await getByTestId('message');
    const counter = await getByTestId('counter');
    expect(counter).toContainHTML(String(0));
    expect(message).toContainHTML('start');
  });

  it('should replace message with payload', async () => {
    expect.assertions(2);

    const increment = await getByTestId('increment');
    const updateMessage = await getByTestId('updateMessage');

    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(updateMessage);

    const counter = await getByTestId('counter');
    const message = await getByTestId('message');
    expect(counter).toContainHTML('2');
    expect(message).toHaveTextContent('update');
  });
});
