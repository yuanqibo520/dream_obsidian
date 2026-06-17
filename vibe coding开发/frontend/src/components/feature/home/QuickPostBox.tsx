import { ImagePlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button";
import { Avatar } from "../../common/Avatar";
import { currentUser } from "../../../services/mockData";

export function QuickPostBox() {
  const navigate = useNavigate();

  return (
    <section className="surface-card rounded-[22px] p-4">
      <div className="flex items-center gap-3">
        <Avatar src={currentUser.avatarUrl} alt={currentUser.nickname} />
        <button
          className="flex-1 rounded-2xl border border-dashed border-primary/25 bg-primary/5 px-4 py-3 text-left text-sm font-semibold text-muted transition hover:bg-primary/10"
          onClick={() => navigate("/posts/new")}
          type="button"
        >
          分享校园里的新鲜事...
        </button>
        <Button variant="secondary" onClick={() => navigate("/posts/new")}>
          <ImagePlus className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-primary">
        <Sparkles className="h-4 w-4" />
        支持匿名、图片、地点和板块标签
      </div>
    </section>
  );
}
