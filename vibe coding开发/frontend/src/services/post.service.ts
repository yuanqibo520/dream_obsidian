import { channels, USE_MOCK_API } from "../app/constants";
import { ApiError, type PageResult, type SortMode } from "../types/api";
import type { CreatePostRequest, Post } from "../types/post";
import { apiGet, apiPost } from "./http";
import { addMockPost, currentUser, findChannelName, posts, updateMockPost } from "./mockData";

type GetPostsParams = {
  channelId?: string;
  keyword?: string;
  sort?: SortMode;
  cursor?: string | null;
};

export async function getPosts(params: GetPostsParams = {}): Promise<PageResult<Post>> {
  if (!USE_MOCK_API) {
    return apiGet<PageResult<Post>>("/posts", params);
  }

  const keyword = params.keyword?.trim().toLowerCase();
  let items = posts.filter((post) => post.status === "published");

  if (params.channelId) {
    items = items.filter((post) => post.channelId === params.channelId);
  }

  if (keyword) {
    items = items.filter((post) => `${post.title}${post.content}${post.channelName}`.toLowerCase().includes(keyword));
  }

  items = [...items].sort((a, b) => {
    if (params.sort === "latest") {
      return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    }
    return b.likeCount + b.commentCount * 2 - (a.likeCount + a.commentCount * 2);
  });

  return { items, nextCursor: null };
}

export async function getPostById(postId: string): Promise<Post> {
  if (!USE_MOCK_API) {
    return apiGet<Post>(`/posts/${postId}`);
  }

  const post = posts.find((item) => item.id === postId && item.status === "published");
  if (!post) {
    throw new ApiError("帖子不存在或已被处理", 404);
  }
  return post;
}

export async function createPost(payload: CreatePostRequest): Promise<Post> {
  if (!USE_MOCK_API) {
    return apiPost<Post>("/posts", payload);
  }

  const channel = channels.find((item) => item.id === payload.channelId);

  return addMockPost({
    title: payload.title,
    content: payload.content,
    authorId: currentUser.id,
    authorName: payload.isAnonymous ? "匿名同学" : currentUser.nickname,
    authorAvatar: currentUser.avatarUrl,
    channelId: (channel?.id ?? "general") as Post["channelId"],
    channelName: findChannelName(payload.channelId),
    status: "published",
    imageUrls: payload.imageUrls,
    likeCount: 0,
    commentCount: 0,
    favoriteCount: 0,
    isLiked: false,
    isFavorited: false,
    isAnonymous: payload.isAnonymous,
    location: payload.location,
  });
}

export async function likePost(postId: string): Promise<Post> {
  if (!USE_MOCK_API) {
    return apiPost<Post>(`/posts/${postId}/like`);
  }

  const post = updateMockPost(postId, (item) => ({
    ...item,
    isLiked: !item.isLiked,
    likeCount: item.isLiked ? Math.max(0, item.likeCount - 1) : item.likeCount + 1,
  }));
  if (!post) throw new ApiError("帖子不存在或已被处理", 404);
  return post;
}

export async function favoritePost(postId: string): Promise<Post> {
  if (!USE_MOCK_API) {
    return apiPost<Post>(`/posts/${postId}/favorite`);
  }

  const post = updateMockPost(postId, (item) => ({
    ...item,
    isFavorited: !item.isFavorited,
    favoriteCount: item.isFavorited ? Math.max(0, item.favoriteCount - 1) : item.favoriteCount + 1,
  }));
  if (!post) throw new ApiError("帖子不存在或已被处理", 404);
  return post;
}
