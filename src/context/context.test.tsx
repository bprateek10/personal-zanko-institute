import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SidebarToggleContext } from './AppContext';

const TestComponent = () => {
  const { collapsed, setCollapsed } = React.useContext(SidebarToggleContext);
  return (
    <div>
      <p>Sidebar is {collapsed ? 'collapsed' : 'expanded'}</p>
      <button onClick={() => setCollapsed(!collapsed)}>Toggle</button>
    </div>
  );
};

const renderWithContext = (value: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return render(
    <SidebarToggleContext.Provider value={value}>
      <TestComponent />
    </SidebarToggleContext.Provider>,
  );
};

describe('SidebarToggleContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with collapsed state as false initially', () => {
    renderWithContext({ collapsed: false, setCollapsed: vi.fn() });
    expect(screen.getByText(/Sidebar is expanded/i)).toBeInTheDocument();
  });

  it('toggles collapsed state when button is clicked', () => {
    const setCollapsed = vi.fn();
    const { rerender } = renderWithContext({ collapsed: false, setCollapsed });

    const button = screen.getByText(/Toggle/i);
    fireEvent.click(button);

    expect(setCollapsed).toHaveBeenCalledWith(true);

    rerender(
      <SidebarToggleContext.Provider value={{ collapsed: true, setCollapsed }}>
        <TestComponent />
      </SidebarToggleContext.Provider>,
    );

    expect(screen.getByText(/Sidebar is collapsed/i)).toBeInTheDocument();
  });

  it('renders with collapsed state as true', () => {
    renderWithContext({ collapsed: true, setCollapsed: vi.fn() });
    expect(screen.getByText(/Sidebar is collapsed/i)).toBeInTheDocument();
  });
});
