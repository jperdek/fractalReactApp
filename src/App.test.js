import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import 'jest-canvas-mock';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Modified w-curve!!!/i);
  expect(linkElement).toBeInTheDocument();
});