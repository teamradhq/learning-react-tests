import React, { useState } from 'react';
import {
  render,
} from "@testing-library/react";

function RenderComponent() {
  const [counter, updateCounter] = useState(0);

  return (
    <div data-testid="render">
      <div data-testid="counter">{counter}</div>
      <button data-testid="increment"
        onClick={() => updateCounter(counter + 1)}
      >Increment</button>
    </div>
  );
}

function renderComponent() {
  return render(<RenderComponent />);
}

describe('useState', () => {
  it('should update state on click', async () => {
    const { getByTestId } = renderComponent();
    const component = await getByTestId('render');
    const button = await getByTestId('increment');

    const expected = 5;
    for (let i = 0; i < expected; i++) {
      button.click();
    }
    const counter = await getByTestId('counter');
    expect(counter.textContent).toContain(String(expected));
  });
});
