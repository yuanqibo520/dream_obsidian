import { USE_MOCK_API } from "../app/constants";
import type { AdminReport, ReportRequest } from "../types/report";
import { apiPost } from "./http";
import { addMockReport } from "./mockData";

export async function createReport(payload: ReportRequest): Promise<AdminReport> {
  if (!USE_MOCK_API) {
    return apiPost<AdminReport>("/reports", payload);
  }
  return addMockReport(payload);
}
