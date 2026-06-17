import { Outlet, Link } from "react-router-dom";

export function AdminLayout() {
  return (
    <main className="mesh-bg min-h-screen">
      <header className="border-b border-white/70 bg-white/70 px-6 py-4 backdrop-blur-xl">
        <Link to="/home" className="text-sm font-semibold text-primary">
          返回 SauLink
        </Link>
      </header>
      <Outlet />
    </main>
  );
}
