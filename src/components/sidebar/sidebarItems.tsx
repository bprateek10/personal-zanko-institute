import {
  DesktopOutlined,
  FileDoneOutlined,
  FileOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  { key: '/', icon: <HomeOutlined />, label: 'Home' },
  {
    key: '/content',
    icon: <DesktopOutlined />,
    label: 'Content',
    children: [
      {
        key: '/content/content-list',
        label: 'Institute Content',
        icon: <FileOutlined />,
      },
      {
        key: '/content/approval-requests',
        label: 'Approval Requests',
        icon: <FileDoneOutlined />,
      },
    ],
  },
];
