import React, { createContext, useContext } from 'react';

export interface StatusContextProps {
  name: string;
  message: string;
}

export interface StatusContextPropsList {
  [key: string]: StatusContextProps;
}


export const statusList: StatusContextPropsList = {
  ok: { name: 'Ok', message: 'all good' },
  error: { name: 'Error', message: 'whoops' },
};

export const StatusContext = createContext<StatusContextProps>(statusList.ok);

export function UseContextComponent(): JSX.Element {
  const status = useContext(StatusContext);

  return (
    <div data-testid="render">
      {status?.name} - {status?.message}
    </div>
  );
}
