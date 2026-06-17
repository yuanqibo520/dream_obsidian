import { Avatar } from "../../common/Avatar";
import { formatRelativeTime } from "../../../lib/formatDate";
import type { Comment } from "../../../types/comment";

type CommentListProps = {
  comments: Comment[];
};

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="surface-card rounded-[22px] p-5">
      <h2 className="mb-4 text-lg font-extrabold text-ink">评论</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 border-b border-line pb-4 last:border-0 last:pb-0">
            <Avatar src={comment.authorAvatar} alt={comment.authorName} size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-ink">{comment.authorName}</span>
                <span className="text-xs text-muted">{formatRelativeTime(comment.publishedAt)}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
