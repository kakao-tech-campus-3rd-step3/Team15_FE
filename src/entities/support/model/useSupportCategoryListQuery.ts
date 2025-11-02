import { useSuspenseQuery } from '@tanstack/react-query';
import { supportService } from '../lib/supportService';
import type { SupportProgramListResponse } from './supportProgram.type';

export function useSupportCategoryListQuery(category: string) {
  return useSuspenseQuery<SupportProgramListResponse>({
    queryKey: ['support-program-category-list', category],
    queryFn: () => supportService.getSupportProgramCategoryList(category),
  });
}
