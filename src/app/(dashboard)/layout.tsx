"use client";

import AuthRoute from "@/components/authRoute";
import Sidebar from "@/components/dashboard/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRoute>
      <div className="font-nunito flex h-screen flex-col overflow-hidden md:flex-row">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </AuthRoute>
  );
}
