import React, { useState, useEffect, useCallback, useMemo } from 'react';

import {
  UserOutlined,
  PlayCircleOutlined,
  MailOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { hasStudentToken } from '@/utils/student/student-auth';

type ItemType = {
  label?: string;
  key?: string;
  icon?: React.ElementType;
  show?: boolean;
};

const items: ItemType[] = [
  {
    label: 'Students',
    key: 'students',
    icon: UserOutlined,
    show: true,
  },
  {
    label: 'Staff',
    key: 'staff',
    icon: UserOutlined,
    show: true,
  },
  {
    label: 'Content',
    key: 'content',
    icon: PlayCircleOutlined,
    show: true,
  },
  {
    label: 'Conversation',
    key: 'conversation',
    icon: MailOutlined,
    show: true,
  },
  {
    label: 'Sign-Up',
    key: 'signup',
    icon: LogoutOutlined,
    show: true,
  },
  {
    label: 'Settings',
    key: 'setting',
    icon: SettingOutlined,
    show: false,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState<string>('students');
  const pathname = usePathname();

  const onClick = (e: ItemType): void => {
    setCurrent(e.key as string);
  };

  const currentItems: ItemType[] = useMemo(() => {
    return items.map((item) => {
      if (item.key === 'signup') {
        return { ...item, show: !hasStudentToken() };
      }
      if (item.key === 'setting') {
        return { ...item, show: hasStudentToken() };
      }

      return item;
    });
  }, []);

  useEffect(() => {
    if (typeof pathname === 'string') {
      const tabKeys = pathname.split('/');
      const tabKey: string = tabKeys.pop() || ' ';
      if (tabKey !== current) {
        setCurrent(tabKey);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className="bg-white">
      <ul className="grid grid-cols-5 justify-center gap-x-0 px-1 pt-1">
        {currentItems
          .filter((item: ItemType) => item.show)
          .map((item: ItemType) => {
            const Icon: React.ElementType = item.icon || UserOutlined;
            const isActive = current === item.key;
            return (
              <Link key={item.key} href={`/student-portal/${item.key}`}>
                <li
                  key={item.key}
                  className={`group flex cursor-pointer flex-col items-center text-center ${
                    isActive ? 'text-indigo-600' : 'text-gray-600'
                  }`}
                  onClick={() => {
                    onClick(item);
                  }}
                >
                  <div className="px-1 py-1 md:px-3 md:py-3">
                    <Icon
                      className={`mt-1 text-sm ${
                        isActive ? 'text-indigo-600' : 'text-gray-600'
                      } group-hover:text-indigo-500`}
                    />
                    <p
                      className={`mt-1 text-[7px] md:text-sm ${
                        isActive ? 'text-indigo-600' : 'text-gray-600'
                      } group-hover:text-indigo-500`}
                    >
                      {item.label}
                    </p>
                  </div>

                  <div
                    className={`${isActive ? 'h-0.5' : 'h-px'} w-full ${isActive ? 'bg-indigo-600' : 'bg-gray-400'} mt-1`}
                  ></div>
                </li>
              </Link>
            );
          })}
      </ul>
    </nav>
  );
};

export default Header;
