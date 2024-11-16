import { HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  { key: '/', icon: <HomeOutlined />, label: 'Home' },
];
