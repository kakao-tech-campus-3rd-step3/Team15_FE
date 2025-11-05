import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { BadgeResponse } from '../types/badge';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { badgeQueryKeys } from '../model/queryKeys';

const getBadges = async (): Promise<BadgeResponse> => {
  const { data } = await axiosInstance.get<BadgeResponse>('/users/me/badges');
  return data;
};

const useBadgesOptions = () => {
  return queryOptions({
    queryKey: badgeQueryKeys.userBadges(),
    queryFn: getBadges,
  });
};

export const useBadges = () => {
  return useQuery(useBadgesOptions());
};
