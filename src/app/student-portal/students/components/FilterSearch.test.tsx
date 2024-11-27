import { render, screen, fireEvent } from '@testing-library/react';
import FilterSearch from './FilterSearch';

describe('FilterSearch Component', () => {
  test('renders all Select components with correct placeholders', () => {
    render(<FilterSearch />);
    const select = screen.getByRole('combobox', { name: 'Degree Level' });
    expect(select).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Area of Study' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Country/Region' }),
    ).toBeInTheDocument();
  });

  test('adds a filter when a Select option is chosen', async () => {
    render(<FilterSearch />);

    const degreeSelect = screen.getByRole('combobox', { name: 'Degree Level' });
    const areaSelect = screen.getByRole('combobox', { name: 'Area of Study' });
    const countrySelect = screen.getByRole('combobox', {
      name: 'Country/Region',
    });

    await fireEvent.change(degreeSelect, { target: { value: 'Bachelors' } });
    expect(screen.getByText('Bachelors')).toBeInTheDocument();

    await fireEvent.change(areaSelect, { target: { value: 'Accounting' } });
    expect(screen.getByText('Accounting')).toBeInTheDocument();

    await fireEvent.change(countrySelect, { target: { value: 'USA' } });
    expect(screen.getByText('USA')).toBeInTheDocument();
  });
});
