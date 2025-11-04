import { useSuspenseQuery } from '@tanstack/react-query';
import { supportService } from '../lib/supportService';
import type { SupportProgramDetail } from './supportProgram.type';

export function useSupportDetailQuery(id: number) {
  return useSuspenseQuery<SupportProgramDetail>({
    queryKey: ['support-program-detail', id],
    queryFn: () => supportService.getSupportProgramDetail(id),
  });
}
