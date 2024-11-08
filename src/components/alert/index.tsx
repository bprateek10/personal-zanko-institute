import React from 'react';
import { Alert } from 'antd';

interface AlertsProps {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

const Alerts: React.FC<AlertsProps> = ({
  message = 'Something went wrong',
  type = 'error',
}) => {
  return <Alert message={message} type={type} closable />;
};

export default Alerts;
