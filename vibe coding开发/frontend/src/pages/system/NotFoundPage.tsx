import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { PageContainer } from "../../components/layout/PageContainer";

export function NotFoundPage() {
  return (
    <PageContainer>
      <section className="surface-card mx-auto max-w-xl rounded-[24px] p-8 text-center">
        <p className="text-sm font-bold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-black text-ink">页面不存在</h1>
        <p className="mt-3 text-sm leading-6 text-muted">这个入口可能已经移动，或者内容已被删除。</p>
        <Link to="/home" className="mt-6 inline-flex">
          <Button type="button">回到首页</Button>
        </Link>
      </section>
    </PageContainer>
  );
}
