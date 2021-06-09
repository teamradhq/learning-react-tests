import React from 'react';
import {renderComponent} from '#helpers/renderComponent';

import {
  ContextProvider,
      ContextProps,
  UseContextComponent,
} from '@src/UseContextComponent';

interface RenderProps {
  context: ContextProps;
}

/**
 * Render a ContextProvider with context having
 * value of {context}. This will be provided to
 * the child component as value for {status}.
 *
 * @param props {RenderProps}
 *
 * @returns {React.Provider<ContextProps>}
 */
function RenderContextProvider({ context }: RenderProps) {
  return (
    <ContextProvider value={context}>
      <UseContextComponent />
    </ContextProvider>
  );
}

const render = renderComponent(RenderContextProvider);

describe('useContext', () => {
  /**
   * The value of {status.name} and {status.message}
   * in child components will correspond to the values
   * passed to the provider.
   */
  it.each([
    ['ok', { name: 'Ok', message: 'good' }, 'Ok - good'],
    ['error', { name: 'Error', message: 'bad' }, 'Error - bad'],
    ['no', { name: 'No', message: 'nothing' }, 'No - nothing'],
  ])('should render status "%s" with message "%s"', async (status, context, message) => {
    expect.assertions(1);

    const { getByTestId } = render({ context });

    expect(await getByTestId('render')).toHaveTextContent(message);
  });

  /**
   * If we don't provide a context with the required prop
   * values, they will be undefined.
   */
  it('should render undefined context', async () => {
    expect.assertions(1);

    const { getByTestId } = render({});

    expect(await getByTestId('render')).toHaveTextContent('-');
  });
});
