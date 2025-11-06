import { useQuery } from '@tanstack/react-query';
import { activityQueryKeys } from '../model/queryKeys';
import { activityService } from '../lib/activityService';

export const useActivityPosts = () => {
  return useQuery({
    queryKey: activityQueryKeys.posts(),
    queryFn: activityService.getMyPosts,
  });
};
export const useActivityComments = () => {
  return useQuery({
    queryKey: activityQueryKeys.comments(),
    queryFn: activityService.getMyComments,
  });
};
export const useActivityLikes = () => {
  return useQuery({
    queryKey: activityQueryKeys.likedPosts(),
    queryFn: activityService.getLikedPosts,
  });
};
