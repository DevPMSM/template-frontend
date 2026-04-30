"use client";

import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated() && pathname === "/admin") {
      router.push("/admin/users");
    }
  }, [router, isAuthenticated]);
}
