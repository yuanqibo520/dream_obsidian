import { PageContainer } from "../../components/layout/PageContainer";
import { SettingsForm } from "../../components/feature/profile/SettingsForm";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";

export function SettingsPage() {
  return (
    <PageContainer>
      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="surface-card h-fit rounded-[22px] p-4">
          {["账号与安全", "通用设置", "个性化", "关于应用"].map((item, index) => (
            <button key={item} className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-bold ${index === 1 ? "bg-primary text-white" : "text-muted hover:bg-white/70"}`}>
              {item}
            </button>
          ))}
        </aside>
        <div className="space-y-5">
          <section className="glass-panel rounded-[28px] p-6">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-primary">Settings</p>
            <h1 className="text-3xl font-black text-ink">账号与安全</h1>
            <p className="mt-2 text-sm text-muted">维护手机号、邮箱、密码和基础登录安全。</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input value="18800000000" readOnly />
              <Input value="yuan@example.com" readOnly />
            </div>
            <Button variant="secondary" className="mt-4">
              修改密码
            </Button>
          </section>
          <SettingsForm />
        </div>
      </div>
    </PageContainer>
  );
}
