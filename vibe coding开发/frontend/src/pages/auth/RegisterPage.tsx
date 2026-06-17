import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { ErrorState } from "../../components/common/ErrorState";
import { Input } from "../../components/common/Input";
import { register } from "../../services/auth.service";
import { useAuthStore } from "../../stores/auth.store";

export function RegisterPage() {
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
      const session = await register({
        phone: String(form.get("phone") ?? ""),
        password: String(form.get("password") ?? ""),
        realName: String(form.get("realName") ?? ""),
        studentNo: String(form.get("studentNo") ?? ""),
        school: String(form.get("school") ?? ""),
      });
      setSession(session.token, session.user);
      navigate("/home");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "注册失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="glass-panel w-full max-w-lg rounded-3xl p-6">
      <h1 className="text-2xl font-extrabold text-ink">创建 SauLink 账号</h1>
      <p className="mt-2 text-sm text-muted">首版预留学生认证字段，后续可接教务或学号认证。</p>
      {error && <div className="mt-4"><ErrorState label={error} /></div>}
      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <Input name="phone" placeholder="手机号" required />
        <Input name="password" type="password" placeholder="密码" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="realName" placeholder="真实姓名" required />
          <Input name="studentNo" placeholder="学号" required />
        </div>
        <Input name="school" placeholder="所在学校" required />
        <Button disabled={submitting}>{submitting ? "注册中..." : "注册并进入"}</Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted">
        已有账号？{" "}
        <Link to="/login" className="font-bold text-primary">
          返回登录
        </Link>
      </p>
    </section>
  );
}
