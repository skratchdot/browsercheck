import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './app';

test('renders the validate button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/validate/i);
  expect(buttonElement).toBeInTheDocument();
});
