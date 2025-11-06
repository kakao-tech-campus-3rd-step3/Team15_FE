import { useSuspenseQuery } from '@tanstack/react-query';
import { reportService } from '../lib/reportService';

export function useGetReportReasonType() {
  return useSuspenseQuery({
    queryKey: ['reportReasonType'],
    queryFn: () => reportService.getReportReasonType(),
  });
}
