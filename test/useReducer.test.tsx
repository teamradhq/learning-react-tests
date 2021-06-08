import { fireEvent } from "@testing-library/react";
import { renderComponent } from '#helpers/renderComponent';

import { UseReducerComponent } from '@src/UseReducerComponent';

const render = renderComponent(UseReducerComponent);

describe('useReducer', () => {
  let getByTestId;

  beforeEach(() => {
    getByTestId = render().getByTestId;
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
