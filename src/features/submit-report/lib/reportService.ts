import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { ReportReasonResponse, ReportRequest } from '../model/report.type';

export const reportService = {
  async submitReport(payload: ReportRequest): Promise<void> {
    await axiosInstance.post('/reports', payload);
  },
  async getReportReasonType(): Promise<ReportReasonResponse> {
    const { data } = await axiosInstance.get<ReportReasonResponse>('/reports/reasons');
    return data;
  },
};
