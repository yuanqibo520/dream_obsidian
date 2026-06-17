import { Bell, Lock, Moon } from "lucide-react";
import { Button } from "../../common/Button";

const settings = [
  { label: "消息推送", description: "接收评论、点赞、@ 提及和系统通知", icon: Bell },
  { label: "隐私模式", description: "减少个人主页展示的信息", icon: Lock },
  { label: "夜间模式", description: "预留深色霓虹主题入口", icon: Moon },
];

export function SettingsForm() {
  return (
    <section className="surface-card rounded-[22px] p-5">
      <h2 className="text-xl font-black text-ink">通用设置</h2>
      <div className="mt-4 space-y-3">
        {settings.map((setting) => (
          <label key={setting.label} className="flex items-center gap-3 rounded-xl bg-white/60 p-4">
            <setting.icon className="h-5 w-5 text-primary" />
            <span className="flex-1">
              <span className="block text-sm font-bold text-ink">{setting.label}</span>
              <span className="block text-xs text-muted">{setting.description}</span>
            </span>
            <input type="checkbox" className="h-5 w-5 accent-primary" defaultChecked={setting.label !== "夜间模式"} />
          </label>
        ))}
      </div>
      <Button className="mt-5">保存设置</Button>
    </section>
  );
}
