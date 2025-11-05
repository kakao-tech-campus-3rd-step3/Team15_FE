import { useSuspenseQuery } from '@tanstack/react-query';
import { getHeaderData } from '../api/header.api';

export function useUserSummaryQuery() {
  return useSuspenseQuery({
    queryKey: ['user', 'summary'],
    queryFn: getHeaderData,
  });
}
