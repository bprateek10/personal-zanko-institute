import { Spin } from 'antd';
import React from 'react';

interface Props {
  size?: 'large' | 'small' | 'default';
  fullScreen?: boolean;
}

const Loader: React.FC<Props> = ({ size = 'large', fullScreen = false }) => {
  return <Spin data-testid="loader" size={size} fullscreen={fullScreen} />;
};

export default Loader;
