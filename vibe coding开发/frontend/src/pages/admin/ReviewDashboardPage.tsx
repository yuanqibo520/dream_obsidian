import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { reportStatusLabels } from "../../app/constants";
import { PageContainer } from "../../components/layout/PageContainer";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { LoadingState } from "../../components/common/LoadingState";
import { getAdminReports, resolveReport } from "../../services/admin.service";

export function ReviewDashboardPage() {
  const queryClient = useQueryClient();
  const reportsQuery = useQuery({ queryKey: ["admin-reports"], queryFn: getAdminReports });
  const resolveMutation = useMutation({
    mutationFn: resolveReport,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    },
  });

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="text-3xl font-extrabold text-ink">后台审核台</h1>
        <p className="mt-2 text-sm text-muted">处理举报、内容审核、用户治理和敏感内容线索。</p>
      </div>
      <section className="glass-panel rounded-glass p-5">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-extrabold text-ink">举报列表</h2>
        </div>
        {reportsQuery.isLoading && <LoadingState label="正在加载举报列表..." />}
        {reportsQuery.isError && <ErrorState label={reportsQuery.error.message} />}
        {!reportsQuery.isLoading && reportsQuery.data?.length === 0 && <EmptyState title="暂无举报" description="当前没有待处理内容。" />}
        <div className="space-y-3">
          {reportsQuery.data?.map((report) => (
            <div key={report.id} className="flex flex-col gap-3 rounded-xl bg-white/60 p-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-ink">{report.targetTitle}</h3>
                  <Badge tone={report.status === "pending" ? "yellow" : "green"}>{reportStatusLabels[report.status]}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{report.reason}</p>
                {report.result && <p className="mt-1 text-xs font-semibold text-emerald-700">{report.result}</p>}
              </div>
              <Button
                variant="secondary"
                disabled={report.status !== "pending" || resolveMutation.isPending}
                onClick={() => resolveMutation.mutate(report.id)}
              >
                标记处理
              </Button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
