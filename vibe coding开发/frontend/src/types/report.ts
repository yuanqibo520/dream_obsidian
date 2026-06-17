export type ReportTargetType = "post" | "comment";
export type ReportStatus = "pending" | "resolved" | "rejected";

export type ReportRequest = {
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  detail: string;
};

export type AdminReport = {
  id: string;
  targetType: ReportTargetType;
  targetId?: string;
  targetTitle: string;
  reason: string;
  status: ReportStatus;
  result?: string;
  createdAt: string;
};
