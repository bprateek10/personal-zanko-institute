import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '.';

describe('Loader Component', () => {
  it('renders with default size and without fullscreen', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('ant-spin-lg');
    expect(loaderElement).not.toHaveClass('ant-spin-fullscreen');
  });

  it('renders with "small" size when passed as prop', () => {
    render(<Loader size="small" />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('ant-spin-sm');
  });

  it('renders with "large" size when passed as prop', () => {
    render(<Loader size="large" />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('ant-spin-lg');
  });
});
