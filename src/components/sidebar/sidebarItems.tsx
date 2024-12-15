import {
  FileDoneOutlined,
  FileOutlined,
  HomeOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  { key: '/', icon: <HomeOutlined />, label: 'Home' },
  {
    key: '/content',
    icon: <YoutubeOutlined />,
    label: 'Content',
    children: [
      {
        key: '/content/content-list',
        label: 'Institute Content',
        icon: <FileOutlined />,
      },
      {
        key: '/content/requests-list',
        label: 'Approval Requests',
        icon: <FileDoneOutlined />,
      },
    ],
  },
];
