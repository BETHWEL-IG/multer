import { render, screen } from '@testing-library/react';
import { LoginUsers } from '../loginForm';
//import { useLoginForm } from '../useLoginForm';

test('h1 element availlable', () => {
  render(<LoginUsers />);
  const headingElement = screen.getByText(/login/i);
  expect(headingElement).toBeInTheDocument();
});

test('h1 element availlable', () => {
    render(<LoginUsers />);
    const headingElement = screen.getByAltText()
    expect(headingElement).toBeInTheDocument();
  });
