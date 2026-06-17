import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ErrorState } from "../../components/common/ErrorState";
import { PageContainer } from "../../components/layout/PageContainer";
import { PostEditor } from "../../components/feature/posts/PostEditor";
import { createPost } from "../../services/post.service";
import type { CreatePostRequest } from "../../types/post";

export function PostCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/posts/${post.id}`);
    },
  });

  function handleSubmit(payload: CreatePostRequest) {
    mutation.mutate(payload);
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-extrabold text-ink">发布帖子</h1>
        <p className="mb-5 text-sm text-muted">选择板块，输入标题和正文，可以匿名发布。</p>
        {mutation.isError && <ErrorState label={mutation.error.message} />}
        <PostEditor onSubmit={handleSubmit} submitting={mutation.isPending} />
      </div>
    </PageContainer>
  );
}
