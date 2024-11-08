import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Alerts from '.';

describe('Alerts Component', () => {
  it('renders the default message and type', () => {
    render(<Alerts />);
    const alertMessage = screen.getByText(/Something went wrong/i);
    expect(alertMessage).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('ant-alert-error');
  });

  it('renders a custom message', () => {
    render(<Alerts message="Custom error occurred" />);
    const alertMessage = screen.getByText(/Custom error occurred/i);
    expect(alertMessage).toBeInTheDocument();
  });

  it('renders with success type', () => {
    render(<Alerts message="Operation successful" type="success" />);
    const alertMessage = screen.getByText(/Operation successful/i);
    expect(alertMessage).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('ant-alert-success');
  });

  it('renders with info type', () => {
    render(<Alerts message="This is an info message" type="info" />);
    const alertMessage = screen.getByText(/This is an info message/i);
    expect(alertMessage).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('ant-alert-info');
  });

  it('renders with warning type', () => {
    render(<Alerts message="This is a warning message" type="warning" />);
    const alertMessage = screen.getByText(/This is a warning message/i);
    expect(alertMessage).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('ant-alert-warning');
  });

  it('renders with error type', () => {
    render(<Alerts message="This is an error message" type="error" />);
    const alertMessage = screen.getByText(/This is an error message/i);
    expect(alertMessage).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('ant-alert-error');
  });
});
