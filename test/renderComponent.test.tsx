import React from 'react';
import {
  render,
} from "@testing-library/react";

function RenderComponent() {
  return (
    <div data-testid="render">Render!</div>
  );
}

function renderComponent() {
  return render(<RenderComponent />);
}

describe('<RenderComponent>', () => {
  it('should render a div', async () => {
    expect.assertions(2);

    const { getByTestId } = renderComponent();

    const component = await getByTestId('render');
    expect(component).toContainHTML('<div data-testid="render">Render!</div>');
  });
});
