export type PostCategory = "campus-news" | "lost-found" | "marketplace" | "study-help" | "general";
export type PostStatus = "published" | "pending" | "hidden" | "deleted";

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  channelId: PostCategory;
  channelName: string;
  status: PostStatus;
  publishedAt: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  favoriteCount: number;
  isLiked: boolean;
  isFavorited: boolean;
  isAnonymous: boolean;
  price?: number;
  location?: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  channelId: string;
  isAnonymous: boolean;
  imageUrls: string[];
  location?: string;
};
