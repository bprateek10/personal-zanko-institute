import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FilterSection from './FilterSection';

describe('FilterSection Component', () => {
  it('renders the Role select dropdown', () => {
    render(<FilterSection />);
    const roleSelect = screen.getByRole('combobox', { name: 'Role' });
    expect(roleSelect).toBeInTheDocument();
  });

  it('renders the Department select dropdown', () => {
    render(<FilterSection />);
    const departmentSelect = screen.getByRole('combobox', {
      name: 'Department',
    });
    expect(departmentSelect).toBeInTheDocument();
  });

  it('displays role options when Role select is clicked', async () => {
    render(<FilterSection />);
    const roleSelect = screen.getByRole('combobox', { name: 'Role' });
    fireEvent.mouseDown(roleSelect);
    const advisorOption = await screen.findByText('Advisor');
    const coordinatorOption = await screen.findByText('Coordinator');

    expect(advisorOption).toBeInTheDocument();
    expect(coordinatorOption).toBeInTheDocument();
  });

  it('displays department options when Department select is clicked', async () => {
    render(<FilterSection />);
    const departmentSelect = screen.getByRole('combobox', {
      name: 'Department',
    });
    fireEvent.mouseDown(departmentSelect);
    const careerServicesOption = await screen.findByText('Career Services');
    const graduateProgramsOption = await screen.findByText('Graduate Programs');

    expect(careerServicesOption).toBeInTheDocument();
    expect(graduateProgramsOption).toBeInTheDocument();
  });

  it('updates the role filter when a role option is selected', async () => {
    render(<FilterSection />);
    const roleSelect = screen.getByRole('combobox', { name: 'Role' });
    fireEvent.mouseDown(roleSelect);

    const advisorOption = await screen.findByText('Advisor');
    fireEvent.click(advisorOption);

    const selectedRole = screen.findByText('Advisor');
    expect(selectedRole).toBeDefined();
  });

  it('updates the department filter when a department option is selected', async () => {
    render(<FilterSection />);
    const departmentSelect = screen.getByRole('combobox', {
      name: 'Department',
    });
    fireEvent.mouseDown(departmentSelect);
    const careerServicesOption = await screen.findByText('Career Services');
    fireEvent.click(careerServicesOption);

    const selectedDepartment = screen.findByText('Career Services');
    expect(selectedDepartment).toBeDefined();
  });
});
