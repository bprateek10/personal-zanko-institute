'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Popover, Avatar, Divider, Button } from 'antd';
import {
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SidebarToggleContext } from '../../context/AppContext';
import { useQueryClient } from '@tanstack/react-query';
import { Institute } from '@/interface/modals';
import {
  getInstituteUser,
  removeInstituteUser,
} from '@/utils/institute/institute-user';
import { useInstituteMutateData } from '@/hooks/institute/useInstituteApi';
import { removeInstituteToken } from '@/utils/institute/institute-auth';

const Header = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { collapsed, setCollapsed } = useContext(SidebarToggleContext);
  const [open, setOpen] = useState(false);
  const user: Institute = getInstituteUser();
  const logoutMutation = useInstituteMutateData(
    '/api/institutes/v1/sessions',
    'Delete',
  );
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      queryClient.removeQueries({ queryKey: ['me'] });
      removeInstituteToken();
      removeInstituteUser();
      router.push('/login');
    }
  }, [logoutMutation, queryClient, router]);

  const userMenu = (
    <div className="w-48 rounded-md">
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-950">
          {user?.first_name} {user?.last_name}
        </p>
        <p className="truncate text-sm text-gray-400">{user?.email}</p>
      </div>
      <Divider className="!m-0" />
      <div className="flex cursor-pointer flex-col p-2">
        <div className="flex items-center gap-4 p-2 hover:rounded-md hover:bg-gray-200">
          <UserOutlined className="!text-lg !text-[#637381]" />
          <p className="text-sm text-gray-400">Profile</p>
        </div>
        <div className="hover:bg-bg-gray-200 flex items-center gap-4 p-2 hover:rounded-md">
          <SettingOutlined className="!text-lg !text-[#637381]" />
          <p className="text-sm text-gray-400">Settings</p>
        </div>
      </div>
      <Divider className="!m-0" />
      <div className="p-2">
        <p
          className="flex cursor-pointer justify-center px-2 py-1.5 text-primary hover:bg-primary-light"
          onClick={() => logoutMutation.mutate({})}
        >
          Logout
        </p>
      </div>
    </div>
  );
  return (
    <header
      className={
        'fixed left-0 top-0 z-20 flex h-16 w-full items-center justify-between border border-b-neutral-100 bg-white px-4 md:px-6'
      }
    >
      <div className="flex items-center justify-between gap-4">
        <Image
          src={`/images/logo.png`}
          alt="logo"
          width="90"
          height="90"
          priority
        />
        <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div
        className={`flex items-center text-2xl font-black transition-all duration-300 ease-in-out md:ml-[65px]`}
      >
        <div className="flex items-center gap-4">
          <BellOutlined className="!text-[#636AE8FF]" />
          <span className="mlg:!max-w-2xl xxl:!max-w-4xl flex max-w-[150px] items-center text-ellipsis whitespace-nowrap md:max-w-lg">
            <Popover
              placement="bottomRight"
              content={userMenu}
              trigger="click"
              arrow={false}
              open={open}
              onOpenChange={handleOpenChange}
            >
              <div className="cursor-pointer">
                <Avatar
                  size="large"
                  src="/images/header/avtar.jpg"
                  alt="user"
                />
              </div>
            </Popover>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
