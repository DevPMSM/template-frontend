'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function Page() {
  const { getUser } = useAuthStore();

  useEffect(() => {
    console.log(getUser()?.name);
  }, [getUser]);

  return <div className='h-full w-full flex justify-center items-center'>{getUser()?.name}</div>;
}
