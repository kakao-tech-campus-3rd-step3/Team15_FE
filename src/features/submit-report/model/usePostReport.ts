import { useMutation } from '@tanstack/react-query';
import type { ReportRequest } from './report.type';
import { reportService } from '../lib/reportService';

export function usePostReport() {
  return useMutation({
    mutationFn: (payload: ReportRequest) => {
      return reportService.submitReport(payload);
    },
  });
}
