'use client';

import { useAuthStore } from '@/store/authStore';

export default function Page() {
  const { getUser } = useAuthStore();

  return (
    <div className="h-full w-full flex justify-center items-center">
      {getUser()?.name}
    </div>
  );
}
