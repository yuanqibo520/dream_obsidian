import { EmptyState } from "../../common/EmptyState";
import { ErrorState } from "../../common/ErrorState";
import { LoadingState } from "../../common/LoadingState";
import { PostCard } from "./PostCard";
import type { Post } from "../../../types/post";

type PostListProps = {
  posts?: Post[];
  isLoading?: boolean;
  isError?: boolean;
};

export function PostList({ posts = [], isLoading, isError }: PostListProps) {
  if (isLoading) return <LoadingState label="正在加载校园动态..." />;
  if (isError) return <ErrorState label="帖子加载失败，请稍后重试。" />;
  if (!posts.length) return <EmptyState title="还没有帖子" description="换个板块看看，或者发布第一条动态。" />;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
