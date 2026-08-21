"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useShallow } from "zustand/shallow";
import Loading from "./loading";
interface AuthRouteProps {
  children: ReactNode;
  /**
   * Role necessária para acessar a rota
   * @default undefined - apenas autenticação requerida
   */
  requiredRole?: "admin" | string;
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
    validateToken,
  } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isVerified: state.isVerified,
      getRole: state.getRole,
      fetchCurrentUser: state.fetchCurrentUser,
      isLoadingUser: state.isLoadingUser,
      currentUser: state.currentUser,
      validateToken: state.validateToken,
    }))
  );

  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      !currentUser &&
      isAuthenticated() &&
      !isLoadingUser
    ) {
      fetchCurrentUser();
    }
  }, [
    currentUser,
    isAuthenticated,
    isLoadingUser,
    fetchCurrentUser,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let active = true;

    if (isLoadingUser) {
      Promise.resolve().then(() => {
        if (active) setLoading(true);
      });
      return () => {
        active = false;
      };
    }

    const checkAccess = async () => {
      const authValid = isAuthenticated();

      if (!authValid) {
        if (redirectUnauthenticated) {
          router.push("/auth/sign-in");
        }
        if (active) setLoading(false);
        return;
      }

      // Validar token com o servidor
      const tokenValid = await validateToken();

      if (!tokenValid) {
        if (redirectUnauthenticated) {
          router.push("/auth/sign-in");
        }
        if (active) setLoading(false);
        return;
      }

      if (requireVerified && !isVerified()) {
        alert(
          "Você precisa verificar sua conta para acessar a essa página."
        );
        router.push("/auth/verify-email");
        if (active) setLoading(false);
        return;
      }

      if (requiredRole) {
        const userRole = getRole();
        const hasAccess = userRole === requiredRole;

        if (!hasAccess) {
          if (active) setAccessDenied(true);
          if (active) setLoading(false);
          return;
        }
      }

      if (active) setLoading(false);
    };

    checkAccess();

    return () => {
      active = false;
    };
  }, [
    isAuthenticated,
    isVerified,
    getRole,
    requiredRole,
    requireVerified,
    redirectUnauthenticated,
    router,
    isLoadingUser,
    validateToken,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading color="#639855" />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-red-500">
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
