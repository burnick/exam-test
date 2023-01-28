import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'theme';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { UserContextProvider } from 'components/UserContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const TestComponent = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <UserContextProvider>{children}</UserContextProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default TestComponent;
