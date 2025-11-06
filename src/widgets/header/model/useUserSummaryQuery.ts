import { useQuery } from '@tanstack/react-query';
import { getHeaderData } from '../api/header.api';

export function useUserSummaryQuery() {
  return useQuery({
    queryKey: ['user', 'summary'],
    queryFn: getHeaderData,
  });
}
