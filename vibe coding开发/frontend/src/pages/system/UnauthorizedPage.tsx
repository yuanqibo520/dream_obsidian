import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { PageContainer } from "../../components/layout/PageContainer";

export function UnauthorizedPage() {
  return (
    <PageContainer>
      <section className="surface-card mx-auto max-w-xl rounded-[24px] p-8 text-center">
        <p className="text-sm font-bold text-coral">403</p>
        <h1 className="mt-2 text-3xl font-black text-ink">暂时没有访问权限</h1>
        <p className="mt-3 text-sm leading-6 text-muted">请确认账号状态，或切换到有权限的账号后再试。</p>
        <Link to="/home" className="mt-6 inline-flex">
          <Button type="button">回到首页</Button>
        </Link>
      </section>
    </PageContainer>
  );
}
