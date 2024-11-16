'use client';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasInstituteToken } from '@/utils/institute/institute-auth';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { SidebarToggleContext } from '@/context/AppContext';
import classNames from 'classnames';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { collapsed } = useContext(SidebarToggleContext);

  const checkToken = useCallback(() => {
    if (!hasInstituteToken()) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[100vh] overflow-hidden bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <div
          className={classNames('w-full pl-4 pt-20', {
            'pr-36 md:pr-4': !collapsed,
            'pr-[91px] md:pr-4': collapsed,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
