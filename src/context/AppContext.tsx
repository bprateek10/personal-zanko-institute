'use client';
import React, { createContext, useState, ReactNode } from 'react';
// This is a common context file that will be used throughout the application.

export interface SidebarToggleContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultSidebarContextValue: SidebarToggleContextType = {
  collapsed: false,
  setCollapsed: () => {},
};

export const SidebarToggleContext = createContext<SidebarToggleContextType>(
  defaultSidebarContextValue,
);

interface ContextProps {
  children: ReactNode;
}

const AppContext: React.FC<ContextProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <SidebarToggleContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarToggleContext.Provider>
  );
};

export default AppContext;
