export type Comment = {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  publishedAt: string;
  likeCount: number;
  replies: Comment[];
};
