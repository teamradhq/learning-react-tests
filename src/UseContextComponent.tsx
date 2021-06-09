import React, { createContext, useContext } from 'react';

/**
 * Define a shape for context that
 * can be given to provider.
 */
export interface ContextProps {
  name: string;
  message: string;
}

/**
 * Create a context with an initial value.
 */
export const Context = createContext<ContextProps>({
    name: 'Ok',
    message: 'all good',
} as ContextProps);

/**
 * A component that uses that context.
 *
 * @return {JSX.Element}
 */
export function UseContextComponent(): JSX.Element {
  const status = useContext<ContextProps>(Context);

  return (
    <div data-testid="render">
      {status?.name} - {status?.message}
    </div>
  );
}

/**
 * A component whose children can use provided
 * value for context.
 *
 * @return {React.Provider<ContextProps>}
 */
export const ContextProvider = Context.Provider;
