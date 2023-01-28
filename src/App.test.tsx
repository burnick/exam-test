import React from 'react';
import { render, screen } from '@testing-library/react';
import TestComponent from 'components/TestComponent';
import App from './App';

test('renders App Component', () => {
  render(
    <TestComponent>
      <App />
    </TestComponent>,
  );
  const items = screen.getAllByRole('button');
  expect(items).toBeTruthy();
});
