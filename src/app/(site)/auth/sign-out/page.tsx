"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      logout();
      router.push("/auth/sign-in");
    } else {
      router.back();
    }
  }, [router, isAuthenticated, logout]);
}
