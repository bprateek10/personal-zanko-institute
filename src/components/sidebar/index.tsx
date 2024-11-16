'use client';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { items } from './sidebarItems';
import { useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { usePathname } from 'next/navigation';
import { SidebarToggleContext } from '../../context/AppContext';

const Sidebar = () => {
  const { collapsed } = useContext(SidebarToggleContext);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex">
      <div
        role="navigation"
        className={classNames(
          'relative pt-16 transition-all duration-300 ease-in-out',
          {
            'w-32 md:w-44': !collapsed,
            'w-[75px] md:w-20': collapsed,
          },
        )}
      >
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          mode="inline"
          inlineCollapsed={collapsed}
          theme="light"
          items={items}
          className="sidebar-menu min-h-screen"
          onClick={(e) => router.push(e.key)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
