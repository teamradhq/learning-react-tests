/** @module useReducerTest */
import { fireEvent } from "@testing-library/react";
import { renderComponent } from '#helpers/renderComponent';

import { UseReducerComponent } from '@src/UseReducerComponent';

const render = renderComponent(UseReducerComponent);

describe('useReducer', () => {
  let getByTestId;
  beforeEach(() => {
    getByTestId = render().getByTestId;
  });

  /**
   * Expected text after after number of clicks.
   */
  const cases: [string, number][] = [
    ['start', 0],
    ['nice', 1],
    ['nice', 2],
    ['rad', 3],
    ['rad', 4],
  ];

  it.each(cases)(
    'should containt "%s" after %s clicks',
    async (text, clickCount) => {
      expect.assertions(2);

      const increment = await getByTestId('increment');
      for (let i = 0; i < clickCount; i++) {
        fireEvent.click(increment);
      }

      const message = await getByTestId('message');
      const counter = await getByTestId('counter');
      expect(counter).toContainHTML(String(clickCount));
      expect(message).toContainHTML(text);
    }
  );

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
