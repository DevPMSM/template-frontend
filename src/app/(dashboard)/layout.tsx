import AuthRoute from "@/components/authRoute";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRoute>
      <div className="bg-red-100">
        Login to access the dashboard
        {children}
      </div>
    </AuthRoute>
  );
}
