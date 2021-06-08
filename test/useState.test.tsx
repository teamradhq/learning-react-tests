import React, { useState } from 'react';
import {
  render,
  fireEvent,
} from "@testing-library/react";

const initialState = { counter: 0, name: 'name' };

function RenderComponent() {
  const [state, updateState] = useState(initialState);
  const { counter, name } = state;

  const handleNameChange = (e) => {
    const value = e.target.value || e.currentTarget.value;

    if(value.match(/\d/)) {
      updateState({...state, name: initialState.name });
      return;
    }

    updateState({ ...state, name: value.trim().replace(/\s{2,}/g, ' '), });
  }

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
        <input data-testid="name-input" value={name} onChange={handleNameChange} />
        <div data-testid="name-element">{name}</div>
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

  it.each([
    ['new name', 'new name'],
    ['new name', '   new name   '],
    ['new name', '   new    name   '],
    ['name', 'test123'],
    ['name', '123'],
    ['name', '123test'],
    ['name', 'te123st'],
  ])('should set to "%s" if input value is "%s"', async (expected, value) => {
    const input = await getByTestId('name-input');

    fireEvent.change(input, {
      target: { value },
      currentTarget: { value },
    });

    expect(await getByTestId('name-input')).toHaveValue(expected)
    expect(await getByTestId('name-element')).toHaveTextContent(expected)
  });
});
