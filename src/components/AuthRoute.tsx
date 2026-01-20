'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useShallow } from 'zustand/shallow';
import { isServerSide } from '@/lib/is-server-side';

interface AuthRouteProps {
  children: ReactNode;
  /**
   * Role necessária para acessar a rota
   * @default undefined - apenas autenticação requerida
   */
  requiredRole?: 'admin' | string;
  /**
   * Redirecionar para login se não autenticado
   * @default true
   */
  redirectUnauthenticated?: boolean;
  requireVerified?: boolean;
}

export default function AuthRoute({
  children,
  requiredRole,
  redirectUnauthenticated = true,
  requireVerified = false,
}: AuthRouteProps) {
  const router = useRouter();
  const {
    isAuthenticated,
    isVerified,
    getRole,
    fetchCurrentUser,
    isLoadingUser,
    currentUser,
  } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isVerified: state.isVerified,
      getRole: state.getRole,
      fetchCurrentUser: state.fetchCurrentUser,
      isLoadingUser: state.isLoadingUser,
      currentUser: state.currentUser,
    })),
  );
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (isServerSide()) return;

    if (!currentUser && isAuthenticated() && !isLoadingUser) {
      fetchCurrentUser();
    }
  }, [currentUser, isAuthenticated, isLoadingUser, fetchCurrentUser]);

  useEffect(() => {
    if (isServerSide()) return;

    if (isLoadingUser) {
      return;
    }

    const checkAccess = () => {
      const authValid = isAuthenticated();
      const verified = isVerified();

      if (!authValid) {
        if (redirectUnauthenticated) {
          router.push('/auth/sign-in');
        }
        setLoading(false);
        return;
      }

      if (requireVerified && !verified) {
        alert('Você precisa verificar sua conta para acessar a essa página.');
        router.push('/auth/verify-email');
        setLoading(false);
        return;
      }

      if (requiredRole) {
        const userRole = getRole();
        const hasAccess = userRole === requiredRole;

        if (!hasAccess) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }
      }

      setLoading(false);
    };

    checkAccess();
  }, [
    isAuthenticated,
    isVerified,
    getRole,
    requiredRole,
    requireVerified,
    redirectUnauthenticated,
    router,
    isLoadingUser,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2  border-blue-500"></div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Acesso Negado
          </h1>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
