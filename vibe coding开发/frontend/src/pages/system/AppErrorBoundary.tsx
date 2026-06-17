import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { PageContainer } from "../../components/layout/PageContainer";

export function AppErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "页面加载失败，请稍后重试。";

  return (
    <PageContainer>
      <section className="surface-card mx-auto max-w-xl rounded-[24px] p-8 text-center">
        <p className="text-sm font-bold text-coral">出错了</p>
        <h1 className="mt-2 text-3xl font-black text-ink">当前页面无法继续加载</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>
        <Link to="/home" className="mt-6 inline-flex">
          <Button type="button">回到首页</Button>
        </Link>
      </section>
    </PageContainer>
  );
}
