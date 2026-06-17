import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "../../common/Avatar";
import { Badge } from "../../common/Badge";
import { formatRelativeTime } from "../../../lib/formatDate";
import { favoritePost, likePost } from "../../../services/post.service";
import type { Post } from "../../../types/post";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const refreshPosts = () => {
    void queryClient.invalidateQueries({ queryKey: ["posts"] });
    void queryClient.invalidateQueries({ queryKey: ["post", post.id] });
  };
  const likeMutation = useMutation({ mutationFn: () => likePost(post.id), onSuccess: refreshPosts });
  const favoriteMutation = useMutation({ mutationFn: () => favoritePost(post.id), onSuccess: refreshPosts });

  return (
    <article className="surface-card group overflow-hidden rounded-[22px] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-glass">
      <div className="mb-4 flex items-start gap-3">
        <Avatar src={post.authorAvatar} alt={post.authorName} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-ink">{post.authorName}</h3>
            {post.isAnonymous && <Badge tone="gray">匿名</Badge>}
            <Badge tone={post.channelId === "marketplace" ? "green" : post.channelId === "lost-found" ? "yellow" : "blue"}>{post.channelName}</Badge>
          </div>
          <p className="mt-1 text-xs font-medium text-muted">{formatRelativeTime(post.publishedAt)}</p>
        </div>
      </div>
      <Link to={post.channelId === "marketplace" ? `/marketplace/${post.id}` : `/posts/${post.id}`}>
        <h2 className="text-xl font-black leading-snug text-ink transition group-hover:text-primary">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{post.content}</p>
      </Link>
      {post.channelId === "campus-news" && (
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-primary/12 via-coral/10 to-mint/12 p-4">
          <p className="text-xs font-bold text-primary">校园提醒</p>
          <p className="mt-1 text-sm font-semibold text-ink">活动信息已同步到本周校园看板。</p>
        </div>
      )}
      {(post.price || post.location) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.price && <Badge tone="green">¥{post.price}</Badge>}
          {post.location && <Badge tone="gray">{post.location}</Badge>}
        </div>
      )}
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4 text-sm font-semibold text-muted">
        <button
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 hover:bg-coral/10 hover:text-coral ${post.isLiked ? "text-coral" : ""}`}
          disabled={likeMutation.isPending}
          onClick={() => likeMutation.mutate()}
          type="button"
        >
          <Heart className="h-4 w-4" />
          {post.likeCount}
        </button>
        <Link className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 hover:bg-primary/10 hover:text-primary" to={`/posts/${post.id}`}>
          <MessageCircle className="h-4 w-4" />
          {post.commentCount}
        </Link>
        <button
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 hover:bg-primary/10 hover:text-primary ${post.isFavorited ? "text-primary" : ""}`}
          disabled={favoriteMutation.isPending}
          onClick={() => favoriteMutation.mutate()}
          type="button"
        >
          <Bookmark className="h-4 w-4" />
          {post.favoriteCount}
        </button>
        <button className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1.5 hover:bg-primary/10 hover:text-primary" type="button">
          <Share2 className="h-4 w-4" />
          分享
        </button>
      </div>
    </article>
  );
}
