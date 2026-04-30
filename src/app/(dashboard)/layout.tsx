"use client";

import AuthRoute from "@/components/authRoute";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      router.push("/admin/users");
    }
  }, [router]);

  return (
    <AuthRoute>
      <div className="bg-red-100">
        Login to access the dashboard
        {children}
      </div>
    </AuthRoute>
  );
}
