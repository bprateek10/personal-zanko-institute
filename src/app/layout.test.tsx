import { render } from '@testing-library/react';
import RootLayout from './layout';
import React from 'react';

vi.mock('next/font/local', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    variable: 'mock-variable',
  })),
}));

describe('RootLayout', () => {
  it('renders correctly with children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('has correct language attribute', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(container.firstChild).toHaveAttribute('lang', 'en');
  });
});
