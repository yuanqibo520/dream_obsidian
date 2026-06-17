import { USE_MOCK_API } from "../app/constants";
import type { Comment } from "../types/comment";
import { apiGet, apiPost } from "./http";
import { addMockComment, comments } from "./mockData";

export async function getComments(postId: string): Promise<Comment[]> {
  if (!USE_MOCK_API) {
    return apiGet<Comment[]>(`/posts/${postId}/comments`);
  }
  return comments.filter((comment) => comment.postId === postId);
}

export async function createComment(postId: string, content: string): Promise<Comment> {
  if (!USE_MOCK_API) {
    return apiPost<Comment>(`/posts/${postId}/comments`, { content });
  }
  return addMockComment(postId, content);
}

export async function likeComment(commentId: string): Promise<void> {
  if (!USE_MOCK_API) {
    await apiPost<void>(`/comments/${commentId}/like`);
  }
}
