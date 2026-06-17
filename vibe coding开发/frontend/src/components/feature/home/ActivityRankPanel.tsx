import { Heart } from "lucide-react";
import { Button } from "../../common/Button";

const ranks = [
  { name: "林小夏", points: 1250 },
  { name: "学习委员", points: 980 },
  { name: "社团联合会", points: 860 },
];

export function ActivityRankPanel() {
  return (
    <section className="surface-card rounded-[22px] p-5">
      <h2 className="text-lg font-extrabold text-ink">活跃榜</h2>
      <div className="mt-4 space-y-3">
        {ranks.map((rank, index) => (
          <div key={rank.name} className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-white to-slate-50/80 p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary">{index + 1}</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-ink">{rank.name}</p>
              <p className="text-xs font-semibold text-muted">{rank.points} pt</p>
            </div>
            <button className="text-muted hover:text-coral" type="button">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="ghost" className="mt-4 w-full">
        查看完整排行
      </Button>
    </section>
  );
}
