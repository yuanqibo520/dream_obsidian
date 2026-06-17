import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageContainer } from "../../components/layout/PageContainer";
import { Button } from "../../components/common/Button";
import { ErrorState } from "../../components/common/ErrorState";
import { LoadingState } from "../../components/common/LoadingState";
import { NotificationList } from "../../components/feature/messages/NotificationList";
import { getNotifications, markAllNotificationsRead } from "../../services/notification.service";

export function MessageCenterPage() {
  const queryClient = useQueryClient();
  const notificationsQuery = useQuery({ queryKey: ["notifications"], queryFn: getNotifications });
  const markAllMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <PageContainer>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-ink">消息中心</h1>
          <p className="mt-2 text-sm text-muted">评论回复、点赞、提及和系统通知。</p>
        </div>
        <Button variant="secondary" disabled={markAllMutation.isPending} onClick={() => markAllMutation.mutate()}>
          {markAllMutation.isPending ? "标记中..." : "全部标记已读"}
        </Button>
      </div>
      {notificationsQuery.isLoading && <LoadingState label="正在加载消息..." />}
      {notificationsQuery.isError && <ErrorState label={notificationsQuery.error.message} />}
      <NotificationList items={notificationsQuery.data ?? []} />
    </PageContainer>
  );
}
