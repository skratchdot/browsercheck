import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './app';

test('renders the validate button', () => {
  render(<App />);
  const buttonElement = screen.getByTestId('validate-button');
  expect(buttonElement).toBeInTheDocument();
});
