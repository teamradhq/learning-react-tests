import { fireEvent } from "@testing-library/react";
import { renderComponent } from '#helpers/renderComponent';

import { UseStateComponent } from '@src/UseStateComponent';

const render = renderComponent(UseStateComponent);

describe('useState', () => {
  let getByTestId;
  beforeEach(() => {
    getByTestId = render().getByTestId;
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
