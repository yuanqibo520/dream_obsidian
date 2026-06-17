import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/layout/BottomNav";
import { Sidebar } from "../components/layout/Sidebar";
import { TopBar } from "../components/layout/TopBar";

export function MainLayout() {
  return (
    <div className="mesh-bg min-h-screen pb-20 lg:pb-0">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
