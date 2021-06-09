import React, { useState } from 'react';

const initialState = { counter: 0, name: 'name' };

export function UseStateComponent(): JSX.Element {
  const [state, updateState] = useState(initialState);
  const { counter, name } = state;

  const handleNameChange = (e) => {
    const value = e.target.value || e.currentTarget.value;

    if(value.match(/\d/)) {
      updateState({...state, name: initialState.name });
      return;
    }

    updateState({ ...state, name: value.trim().replace(/\s{2,}/g, ' '), });
  };

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
