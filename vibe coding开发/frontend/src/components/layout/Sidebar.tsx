import { BookOpen, Home, Menu, MessageCircle, Newspaper, Search, Settings, ShoppingBag, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useUiStore } from "../../stores/ui.store";
import { Button } from "../common/Button";

const navItems = [
  { label: "首页", to: "/home", icon: Home },
  { label: "校园资讯", to: "/campus-news", icon: Newspaper },
  { label: "失物招领", to: "/lost-found", icon: Search },
  { label: "二手交易", to: "/marketplace", icon: ShoppingBag },
  { label: "学习互助", to: "/study-help", icon: BookOpen },
  { label: "消息中心", to: "/messages", icon: MessageCircle },
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useUiStore();

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-white/70 bg-white/58 p-4 backdrop-blur-2xl lg:flex lg:flex-col",
        sidebarCollapsed ? "w-20" : "w-64",
      )}
    >
      <Button variant="ghost" className="mb-4 justify-start" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        <Menu className="h-5 w-5" />
        {!sidebarCollapsed && "收起导航"}
      </Button>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition duration-200",
                isActive ? "bg-primary text-white shadow-lift" : "text-muted hover:-translate-y-0.5 hover:bg-white/75 hover:text-ink",
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-2">
        <NavLink className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-white/70 hover:text-ink" to="/profile">
          <User className="h-5 w-5" />
          {!sidebarCollapsed && "个人主页"}
        </NavLink>
        <NavLink className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-white/70 hover:text-ink" to="/settings">
          <Settings className="h-5 w-5" />
          {!sidebarCollapsed && "设置"}
        </NavLink>
      </div>
    </aside>
  );
}
