import React, { createContext, useContext } from 'react';
import { render } from "@testing-library/react";

const statusList = {
  ok: { name: 'Ok', message: 'all good' },
  error: { name: 'Error', message: 'whoops' },
}

const StatusContext = createContext(statusList.ok);

function RenderComponent() {
  const status = useContext(StatusContext);

  return (
    <div data-testid="render">
      {status.name} - {status.message}
    </div>
  );
}

function renderComponent(status) {
  return render(
    <StatusContext.Provider value={statusList[status]}>
      <RenderComponent />
    </StatusContext.Provider>
  );
}

describe('useReducer', () => {
  it.each([
    ['ok', 'Ok - all good'],
    ['error', 'Error - whoops'],
  ])('should render with context', async (status, message) => {
    const { getByTestId } = renderComponent(status);

    expect(await getByTestId('render')).toHaveTextContent(message);
  });
});
