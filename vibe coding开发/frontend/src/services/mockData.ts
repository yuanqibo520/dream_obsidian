import { channels } from "../app/constants";
import type { Comment } from "../types/comment";
import type { NotificationItem } from "../types/notification";
import type { Post } from "../types/post";
import type { AdminReport, ReportRequest } from "../types/report";
import type { User } from "../types/user";

export const currentUser: User = {
  id: "u_1001",
  role: "student",
  nickname: "袁同学",
  avatarUrl: "https://api.dicebear.com/8.x/thumbs/svg?seed=saulink",
  school: "SAU 大学",
  grade: "大二",
  major: "计算机科学与技术",
  bio: "喜欢写代码，也喜欢在校园里发现新鲜事。",
  activityPoints: 1250,
};

export const posts: Post[] = [
  {
    id: "p_1",
    title: "期中结束，大家都怎么回血？",
    content: "刚考完期中，想找点轻松的校园活动。有没有适合晚饭后参加的社团活动或者运动局？",
    authorId: "u_2001",
    authorName: "林小夏",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=lin",
    channelId: "general",
    channelName: "校园新鲜事",
    status: "published",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    imageUrls: [],
    likeCount: 24,
    commentCount: 8,
    favoriteCount: 6,
    isLiked: false,
    isFavorited: true,
    isAnonymous: false,
  },
  {
    id: "p_2",
    title: "校园音乐节志愿者开始招募",
    content: "本周五晚的音乐节需要现场引导、签到和摄影志愿者，完成后有志愿时长，感兴趣的同学可以报名。",
    authorId: "u_2002",
    authorName: "社团联合会",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=music",
    channelId: "campus-news",
    channelName: "校园资讯",
    status: "published",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    imageUrls: [],
    likeCount: 156,
    commentCount: 32,
    favoriteCount: 42,
    isLiked: true,
    isFavorited: false,
    isAnonymous: false,
  },
  {
    id: "p_3",
    title: "出九成新机械键盘",
    content: "青轴 87 键，带原包装，宿舍自提。用了两个月，手感很好，只是换了静音键盘。",
    authorId: "u_2003",
    authorName: "匿名同学",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=market",
    channelId: "marketplace",
    channelName: "二手交易",
    status: "published",
    publishedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    imageUrls: [],
    likeCount: 12,
    commentCount: 5,
    favoriteCount: 9,
    isLiked: false,
    isFavorited: false,
    isAnonymous: true,
    price: 139,
    location: "北区 3 栋",
  },
  {
    id: "p_4",
    title: "高数互助小组，本周三晚自习室见",
    content: "主要刷极限和导数综合题，欢迎带题来。会整理一份错题笔记，之后发在学习互助板块。",
    authorId: "u_2004",
    authorName: "学习委员",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=study",
    channelId: "study-help",
    channelName: "学习互助",
    status: "published",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    imageUrls: [],
    likeCount: 48,
    commentCount: 14,
    favoriteCount: 31,
    isLiked: false,
    isFavorited: false,
    isAnonymous: false,
    location: "图书馆 302",
  },
  {
    id: "p_5",
    title: "南门捡到一串钥匙",
    content: "钥匙扣上有蓝色小牌，已经交到门卫室。失主可以带描述去认领。",
    authorId: "u_2005",
    authorName: "热心同学",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=lost",
    channelId: "lost-found",
    channelName: "失物招领",
    status: "published",
    publishedAt: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(),
    imageUrls: [],
    likeCount: 8,
    commentCount: 2,
    favoriteCount: 1,
    isLiked: false,
    isFavorited: false,
    isAnonymous: false,
    location: "南门",
  },
];

export const comments: Comment[] = [
  {
    id: "c_1",
    postId: "p_1",
    authorName: "阿南",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=nan",
    content: "可以去操场夜跑，最近天气刚好。",
    publishedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    likeCount: 4,
    replies: [],
  },
  {
    id: "c_2",
    postId: "p_1",
    authorName: "小周",
    authorAvatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=zhou",
    content: "音乐节志愿者还挺有意思，去年参加过。",
    publishedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    likeCount: 2,
    replies: [],
  },
];

export const notifications: NotificationItem[] = [
  { id: "n_1", type: "comment", title: "有人回复了你的帖子", content: "可以去操场夜跑，最近天气刚好。", createdAt: new Date().toISOString(), isRead: false },
  { id: "n_2", type: "like", title: "你的评论获得点赞", content: "来自学习互助板块", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), isRead: false },
  { id: "n_3", type: "system", title: "社区规范更新", content: "发布内容时请避免暴露个人隐私。", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), isRead: true },
];

export const reports: AdminReport[] = [
  { id: "r_1", targetType: "post", targetId: "p_3", targetTitle: "疑似广告帖", reason: "垃圾广告", status: "pending", createdAt: new Date().toISOString() },
  { id: "r_2", targetType: "comment", targetId: "c_1", targetTitle: "评论区争吵", reason: "人身攻击", status: "pending", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
];

export function findChannelName(channelId: string): string {
  return channels.find((channel) => channel.id === channelId)?.name ?? "校园新鲜事";
}

export function addMockPost(payload: Omit<Post, "id" | "publishedAt">): Post {
  const post: Post = {
    ...payload,
    id: `p_${Date.now()}`,
    publishedAt: new Date().toISOString(),
  };
  posts.unshift(post);
  return post;
}

export function updateMockPost(postId: string, updater: (post: Post) => Post): Post | undefined {
  const index = posts.findIndex((post) => post.id === postId);
  if (index < 0) return undefined;
  posts[index] = updater(posts[index]);
  return posts[index];
}

export function addMockComment(postId: string, content: string): Comment {
  const comment: Comment = {
    id: `c_${Date.now()}`,
    postId,
    authorName: currentUser.nickname,
    authorAvatar: currentUser.avatarUrl,
    content,
    publishedAt: new Date().toISOString(),
    likeCount: 0,
    replies: [],
  };
  comments.unshift(comment);
  updateMockPost(postId, (post) => ({ ...post, commentCount: post.commentCount + 1 }));
  return comment;
}

export function addMockReport(payload: ReportRequest): AdminReport {
  const post = posts.find((item) => item.id === payload.targetId);
  const report: AdminReport = {
    id: `r_${Date.now()}`,
    targetType: payload.targetType,
    targetId: payload.targetId,
    targetTitle: post?.title ?? "被举报内容",
    reason: payload.reason,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  reports.unshift(report);
  return report;
}
