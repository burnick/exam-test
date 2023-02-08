import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'theme';
import { Provider } from 'react-redux';
import { store } from 'store';
import { UserContextProvider } from 'components/UserContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const TestComponent = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <UserContextProvider>{children}</UserContextProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default TestComponent;
