import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="mesh-bg flex min-h-screen items-center justify-center px-4 py-10">
      <Outlet />
    </main>
  );
}
