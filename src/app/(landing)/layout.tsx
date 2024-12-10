'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasInstituteToken } from '@/utils/institute/institute-auth';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import classNames from 'classnames';
import Loader from '@/components/loader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
    return <Loader fullScreen />;
  }

  return (
    <div className="h-[100vh] overflow-hidden bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className={classNames('w-full pl-4 pr-4 pt-20')}>{children}</div>
      </div>
    </div>
  );
}
