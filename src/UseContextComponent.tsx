import React, { createContext, useContext } from 'react';

export const statusList = {
  ok: { name: 'Ok', message: 'all good' },
  error: { name: 'Error', message: 'whoops' },
}

export const StatusContext = createContext(statusList.ok);

export function UseContextComponent() {
  const status = useContext(StatusContext);

  return (
    <div data-testid="render">
      {status?.name} - {status?.message}
    </div>
  );
}
