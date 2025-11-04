import { useSuspenseQuery } from '@tanstack/react-query';
import { supportService } from '../lib/supportService';
import type { SupportProgramListResponse } from './supportProgram.type';

export function useSupportListQuery() {
  return useSuspenseQuery<SupportProgramListResponse>({
    queryKey: ['support-program-list'],
    queryFn: supportService.getSupportProgramList,
  });
}
