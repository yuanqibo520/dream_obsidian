import type { SortMode } from "../types/api";
import type { Channel } from "../types/channel";
import type { NotificationType } from "../types/notification";
import type { ReportStatus } from "../types/report";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const channels: Channel[] = [
  { id: "campus-news", name: "校园资讯", description: "校园公告、社团活动和新鲜事", icon: "Newspaper" },
  { id: "lost-found", name: "失物招领", description: "找回遗失物品，发布线索", icon: "Search" },
  { id: "marketplace", name: "二手交易", description: "闲置发布、线下自提", icon: "ShoppingBag" },
  { id: "study-help", name: "学习互助", description: "课程答疑、资料分享和组队学习", icon: "BookOpen" },
];

export const sortOptions: Array<{ label: string; value: SortMode }> = [
  { label: "热门", value: "hot" },
  { label: "最新", value: "latest" },
];

export const notificationLabels: Record<NotificationType, string> = {
  comment: "评论",
  like: "点赞",
  mention: "提及",
  system: "系统",
};

export const reportStatusLabels: Record<ReportStatus, string> = {
  pending: "待处理",
  resolved: "已处理",
  rejected: "已驳回",
};
