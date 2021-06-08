import React, { useState } from 'react';
import {
  render,
} from "@testing-library/react";

function RenderComponent() {
  const [state, updateCounter] = useState({ counter: 0 });
  const { counter } = state;

  return (
    <div data-testid="render">
      <div data-testid="counter">{counter}</div>
      <button data-testid="increment"
        onClick={() => updateCounter({
          ...state,
          counter: state.counter + 1,
        })}
      >Increment</button>
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
