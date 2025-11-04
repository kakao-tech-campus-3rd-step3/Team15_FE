import { useSuspenseQuery } from '@tanstack/react-query';
import { supportService } from '../lib/supportService';
import type { SupportProgramCountResponse } from './supportProgram.type';

export function useSupportStatsQuery() {
  return useSuspenseQuery<SupportProgramCountResponse>({
    queryKey: ['support-program-count'],
    queryFn: supportService.getSupportCount,
  });
}
