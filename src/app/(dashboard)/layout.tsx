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
      <div className="flex flex-col font-nunito">
        <Sidebar/>
        {children}
      </div>
    </AuthRoute>
  );
}
