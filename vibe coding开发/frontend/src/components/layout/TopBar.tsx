import { Bell, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

export function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/72 backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <Link to="/home" className="flex items-center gap-2 font-display text-xl font-extrabold text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-sm text-white shadow-lift">S</span>
          <span>SauLink</span>
        </Link>
        <div className="hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input className="py-2.5 pl-10" placeholder="搜索帖子、板块、关键词" onFocus={() => navigate("/search")} />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" className="hidden sm:inline-flex" onClick={() => navigate("/messages")}>
            <Bell className="h-4 w-4" />
            消息
          </Button>
          <Button onClick={() => navigate("/posts/new")}>
            <Plus className="h-4 w-4" />
            发帖
          </Button>
        </div>
      </div>
    </header>
  );
}
