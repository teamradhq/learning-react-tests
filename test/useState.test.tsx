import React, { useState } from 'react';
import {
  render,
} from "@testing-library/react";

function RenderComponent() {
  const [state, updateState] = useState({ counter: 0, name: 'name' });
  const { counter } = state;

  return (
    <div data-testid="render">
      <div className="counter--container">
        <div data-testid="counter">{counter}</div>
        <button data-testid="increment"
          onClick={() => updateState({
            ...state,
            counter: state.counter + 1,
          })}
        >Increment</button>
      </div>
      <div className="name--container">
        <input data-testid="name-input" value={state.name} onChange={e => updateState({
            ...state,
            name: e.currentTarget.value,
          })} />
        <div data-testid="name-element"></div>
      </div>
    </div>
  );
}

function renderComponent() {
  return render(<RenderComponent />);
}

describe('useState', () => {
  let getByTestId;
  beforeEach(() => {
    getByTestId = renderComponent().getByTestId;
  });

  it('should have default values', async () => {
    const input = await getByTestId('name-input');
    const counter = await getByTestId('counter');

    expect(input).toHaveValue('name');
    expect(counter).toHaveTextContent('0');
  });

  it('should update state on click', async () => {
    const button = await getByTestId('increment');
    const expected = 3;

    for (let i = 0; i < expected; i++) {
      button.click();
    }

    const counter = await getByTestId('counter');
    expect(counter.textContent).toContain(String(expected));
  });
});
