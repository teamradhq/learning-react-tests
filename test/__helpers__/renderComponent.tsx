import React from 'react';
import { render } from "@testing-library/react";

export function renderComponent(
  RenderComponent,
  defaultProps = {}
) {
  return (props = {}) => render(
    <RenderComponent {...defaultProps} {...props} />
  );
}
