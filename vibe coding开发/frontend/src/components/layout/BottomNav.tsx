import { Home, MessageCircle, Plus, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";

const items = [
  { label: "首页", to: "/home", icon: Home },
  { label: "发现", to: "/search", icon: Search },
  { label: "发布", to: "/posts/new", icon: Plus },
  { label: "消息", to: "/messages", icon: MessageCircle },
  { label: "我的", to: "/profile", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/70 bg-white/80 px-2 py-2 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-semibold", isActive ? "text-primary" : "text-muted")
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
