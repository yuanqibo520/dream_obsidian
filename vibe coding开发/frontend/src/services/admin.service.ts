import { USE_MOCK_API } from "../app/constants";
import type { AdminReport } from "../types/report";
import { apiGet, apiPatch } from "./http";
import { reports } from "./mockData";

export async function getAdminReports(): Promise<AdminReport[]> {
  if (!USE_MOCK_API) {
    return apiGet<AdminReport[]>("/admin/reports");
  }
  return reports;
}

export async function resolveReport(reportId: string): Promise<AdminReport> {
  if (!USE_MOCK_API) {
    return apiPatch<AdminReport>(`/admin/reports/${reportId}`, { status: "resolved" });
  }
  const report = reports.find((item) => item.id === reportId);
  if (!report) throw new Error("举报记录不存在");
  report.status = "resolved";
  report.result = "已由管理员处理";
  return report;
}
