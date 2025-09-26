import { queryOptions, useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api/getUserProfile';

// query key 상수화
export const userProfileQueryKey = ['userProfile'] as const;

// queryOptions 빌더
export const userProfileOptions = () => {
  return queryOptions({
    queryKey: userProfileQueryKey,
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    gcTime: 1000 * 60 * 30, // 30분 garbage collect
  });
};

export const useUserProfile = () => {
  return useQuery(userProfileOptions());
};
