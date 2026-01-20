'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function SignOutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);
}
