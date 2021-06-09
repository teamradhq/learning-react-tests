import React from 'react';
import {renderComponent} from '#helpers/renderComponent';

import {
  StatusContext,
  UseContextComponent,
} from '@src/UseContextComponent';

function RenderContextProvider({ context }) {
  return (
    <StatusContext.Provider value={context}>
      <UseContextComponent />
    </StatusContext.Provider>
  );
}

const render = renderComponent(RenderContextProvider);

describe('useReducer', () => {
  it.each([
    ['ok', { name: 'Ok', message: 'good' }, 'Ok - good'],
    ['error', { name: 'Error', message: 'bad' }, 'Error - bad'],
    ['no', { name: 'No', message: 'nothing' }, 'No - nothing'],
  ])('should render status "%s" with message "%s"', async (status, context, message) => {
    expect.assertions(1);
    const { getByTestId } = render({ context });

    expect(await getByTestId('render')).toHaveTextContent(message);
  });

  it('should render undefined context', async () => {
    expect.assertions(1);
    const { getByTestId } = render({});

    expect(await getByTestId('render')).toHaveTextContent('-');
  });
});
