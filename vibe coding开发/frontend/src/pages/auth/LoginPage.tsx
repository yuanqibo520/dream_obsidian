import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MessageCircle, Smartphone } from "lucide-react";
import { Button } from "../../components/common/Button";
import { ErrorState } from "../../components/common/ErrorState";
import { Input } from "../../components/common/Input";
import { login } from "../../services/auth.service";
import { useAuthStore } from "../../stores/auth.store";

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const session = await login({
        account: String(form.get("account") ?? ""),
        password: String(form.get("password") ?? ""),
        remember: true,
      });
      setSession(session.token, session.user);
      navigate("/home");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "登录失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white/70 shadow-glass backdrop-blur-2xl lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hidden bg-gradient-to-br from-primary via-indigo-500 to-coral p-9 text-white lg:block">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/18 text-2xl font-black shadow-soft">S</div>
            <h1 className="text-5xl font-black leading-tight">SauLink</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">把校园里的提问、活动、闲置和线索收进一个清爽的信息流。</p>
          </div>
          <div className="rounded-3xl bg-white/14 p-5 backdrop-blur-xl">
            <p className="text-sm font-bold">今日校园热度</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["128 动态", "36 回复", "9 线索"].map((item) => (
                <div key={item} className="rounded-2xl bg-white/14 px-3 py-3 text-center text-sm font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-primary">登录账号</h1>
        <p className="mt-2 text-sm text-muted">进入你的校园社区。</p>
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-white/60 p-1">
          <button className="rounded-lg bg-primary py-2 text-sm font-bold text-white" type="button">
            <Smartphone className="mr-1 inline h-4 w-4" />
            手机登录
          </button>
          <button className="rounded-lg py-2 text-sm font-bold text-muted" type="button">
            <MessageCircle className="mr-1 inline h-4 w-4" />
            微信
          </button>
        </div>
        {error && <div className="mt-4"><ErrorState label={error} /></div>}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <Input name="account" placeholder="手机号 / 账号" required />
          <Input name="password" type="password" placeholder="密码" required />
          <Button className="w-full" disabled={submitting}>
            {submitting ? "登录中..." : "登录"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          还没有账号？{" "}
          <Link to="/register" className="font-bold text-primary">
            去注册
          </Link>
        </p>
      </div>
    </section>
  );
}
