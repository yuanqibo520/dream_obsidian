import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Flag } from "lucide-react";
import { PageContainer } from "../../components/layout/PageContainer";
import { Avatar } from "../../components/common/Avatar";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { ErrorState } from "../../components/common/ErrorState";
import { LoadingState } from "../../components/common/LoadingState";
import { CommentComposer } from "../../components/feature/posts/CommentComposer";
import { CommentList } from "../../components/feature/posts/CommentList";
import { ReportDialog } from "../../components/feature/posts/ReportDialog";
import { formatRelativeTime } from "../../lib/formatDate";
import { createComment, getComments } from "../../services/comment.service";
import { favoritePost, getPostById, likePost } from "../../services/post.service";
import { createReport } from "../../services/report.service";

export function PostDetailPage() {
  const { postId = "" } = useParams();
  const [reportOpen, setReportOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const postQuery = useQuery({ queryKey: ["post", postId], queryFn: () => getPostById(postId), enabled: Boolean(postId), retry: false });
  const commentsQuery = useQuery({ queryKey: ["comments", postId], queryFn: () => getComments(postId), enabled: Boolean(postId) });
  const comments = useMemo(() => commentsQuery.data ?? [], [commentsQuery.data]);

  const refreshPost = () => {
    void queryClient.invalidateQueries({ queryKey: ["post", postId] });
    void queryClient.invalidateQueries({ queryKey: ["posts"] });
  };
  const likeMutation = useMutation({ mutationFn: () => likePost(postId), onSuccess: refreshPost });
  const favoriteMutation = useMutation({ mutationFn: () => favoritePost(postId), onSuccess: refreshPost });
  const commentMutation = useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      setNotice("评论已发布");
      void queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      refreshPost();
    },
  });
  const reportMutation = useMutation({
    mutationFn: ({ reason, detail }: { reason: string; detail: string }) => createReport({ targetType: "post", targetId: postId, reason, detail }),
    onSuccess: () => {
      setReportOpen(false);
      setNotice("举报已提交，管理员会尽快处理");
    },
  });

  if (postQuery.isLoading) {
    return (
      <PageContainer>
        <LoadingState label="正在加载帖子详情..." />
      </PageContainer>
    );
  }

  if (postQuery.isError || !postQuery.data) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-3xl">
          <ErrorState label={postQuery.error?.message ?? "帖子不存在或已被删除。"} />
          <Link to="/home" className="mt-4 inline-flex">
            <Button type="button">回到首页</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const post = postQuery.data;

  return (
    <PageContainer>
      <div className="mx-auto max-w-4xl space-y-4">
        {notice && <div className="rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</div>}
        {(commentMutation.isError || reportMutation.isError) && (
          <ErrorState label={commentMutation.error?.message ?? reportMutation.error?.message ?? "操作失败，请稍后重试。"} />
        )}
        <article className="surface-card rounded-[28px] p-6 sm:p-7">
          <div className="mb-5 flex items-start gap-3">
            <Avatar src={post.authorAvatar} alt={post.authorName} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold text-ink">{post.authorName}</h1>
                {post.isAnonymous && <Badge tone="gray">匿名</Badge>}
                <Badge>{post.channelName}</Badge>
              </div>
              <p className="mt-1 text-xs font-medium text-muted">{formatRelativeTime(post.publishedAt)}</p>
            </div>
            <Button variant="ghost" onClick={() => setReportOpen(true)}>
              <Flag className="h-4 w-4" />
              举报
            </Button>
          </div>
          <h2 className="text-3xl font-black leading-tight text-ink">{post.title}</h2>
          <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-700">{post.content}</p>
          <div className="soft-divider my-6" />
          <div className="flex flex-wrap gap-2 text-xs font-bold text-muted">
            <button className="rounded-full bg-primary/10 px-3 py-1.5 text-primary" disabled={likeMutation.isPending} onClick={() => likeMutation.mutate()} type="button">
              {post.likeCount} 点赞
            </button>
            <span className="rounded-full bg-mint/15 px-3 py-1.5 text-emerald-700">{post.commentCount} 评论</span>
            <button className="rounded-full bg-amber/20 px-3 py-1.5 text-amber-700" disabled={favoriteMutation.isPending} onClick={() => favoriteMutation.mutate()} type="button">
              {post.favoriteCount} 收藏
            </button>
          </div>
        </article>
        <CommentComposer onSubmit={(content) => commentMutation.mutate(content)} submitting={commentMutation.isPending} />
        <CommentList comments={comments} />
      </div>
      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={(reason, detail) => reportMutation.mutate({ reason, detail })}
        submitting={reportMutation.isPending}
      />
    </PageContainer>
  );
}
