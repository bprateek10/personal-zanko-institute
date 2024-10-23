'use client';
import React, { useState } from 'react';
import {
  UserOutlined,
  PlayCircleOutlined,
  MailOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

//import './tabsComponent.css';

import Link from 'next/link';

type ItemType = {
  label?: string;
  key?: string;
  icon?: React.ElementType;
};

const items: ItemType[] = [
  {
    label: 'Students',
    key: 'students',
    icon: UserOutlined,
  },
  {
    label: 'Staff',
    key: 'staff',
    icon: UserOutlined,
  },
  {
    label: 'Content',
    key: 'content',
    icon: PlayCircleOutlined,
  },
  {
    label: 'Conversation',
    key: 'conversation',
    icon: MailOutlined,
  },
  {
    label: 'Sign-Up',
    key: 'signup',
    icon: LogoutOutlined,
  },
];

const EmbeddedLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const [current, setCurrent] = useState<string>('students');

  const onClick = (e: ItemType): void => {
    setCurrent(e.key as string);
  };

  return (
    <div className="m-auto max-w-4xl">
      <nav className="bg-white">
        <ul className="grid grid-cols-5 justify-center gap-x-0 px-1 pt-1">
          {items.map((comp: ItemType, itemId: number) => {
            const Icon: React.ElementType = comp.icon || UserOutlined;
            const isActive = current === comp.key;
            return (
              <Link key={comp.key} href={`/student-portal/${comp.key}`}>
                <li
                  key={itemId}
                  className={`group flex cursor-pointer flex-col items-center text-center ${
                    isActive ? 'text-indigo-600' : 'text-gray-600'
                  }`}
                  onClick={() => {
                    onClick(comp);
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
                      {comp?.label}
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

      {children}
    </div>
  );
};

export default EmbeddedLayout;
