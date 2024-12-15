import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '.';

describe('Filter Component', () => {
  it('should render the status and authors Select dropdowns and the filter button', async () => {
    render(<Filter />);
    const statusSelect = screen.getByRole('combobox', { name: 'Status' });
    const authorsSelect = screen.getByRole('combobox', {
      name: 'Select Authors',
    });
    expect(statusSelect).toBeInTheDocument();
    expect(authorsSelect).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
  });
});
