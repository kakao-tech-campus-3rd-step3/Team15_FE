import { queryOptions, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '../api/getUserProfile';
import { userService } from '../lib/userService';
import type {
  UpdateUserProfileRequest,
  ChangePasswordRequest,
  DeleteAccountRequest,
  NotificationSettingRequest,
} from '../types/userProfile';

// query key 상수화
export const userProfileQueryKey = ['userProfile'] as const;
export const userProfileEditQueryKey = ['userProfileEdit'] as const;

// queryOptions 빌더
export const userProfileOptions = () => {
  return queryOptions({
    queryKey: userProfileQueryKey,
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    gcTime: 1000 * 60 * 30, // 30분 garbage collect
  });
};

export const userProfileEditOptions = () => {
  return queryOptions({
    queryKey: userProfileEditQueryKey,
    queryFn: userService.getProfileEdit,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

// 이메일 조회 관련 쿼리키/옵션
export const userEmailQueryKey = ['userEmail'] as const;

export const userEmailOptions = () => {
  return queryOptions({
    queryKey: userEmailQueryKey,
    queryFn: userService.getEmail,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

// 프로필 조회 훅
export const useUserProfile = () => {
  return useQuery(userProfileOptions());
};

// 프로필 수정 조회 훅
export const useUserProfileEdit = () => {
  return useQuery(userProfileEditOptions());
};

// 이메일 조회 훅
export const useUserEmail = () => {
  return useQuery(userEmailOptions());
};

// 프로필 업데이트 훅
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateUserProfileRequest) => userService.updateProfile(body),
    onSuccess: () => {
      // 프로필 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: userProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: userProfileEditQueryKey });
    },
  });
};

// 비밀번호 변경 훅
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (body: ChangePasswordRequest) => userService.changePassword(body),
  });
};

// 이메일 전송(인증 요청) 훅
export const useSendEmailVerification = () => {
  return useMutation({
    mutationFn: (body: { email: string }) => userService.sendEmailVerification(body),
  });
};

// 이메일 변경 훅 (명세에 따라 void 반환)
export const useUpdateEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { email: string; code: string }) => userService.updateEmail(body),
    onSuccess: () => {
      // 이메일/프로필 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: userProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: userEmailQueryKey });
    },
  });
};

// 회원 탈퇴 훅
export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DeleteAccountRequest) => userService.deleteAccount(body),
    onSuccess: () => {
      // 모든 쿼리 캐시 무효화 및 로그아웃 처리
      queryClient.clear();
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    },
  });
};

// 새 댓글 알림 설정 훅
export const useUpdateCommentNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: NotificationSettingRequest) => userService.updateCommentNotification(body),
    onSuccess: () => {
      // 프로필 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: userProfileQueryKey });
    },
  });
};

// 좋아요 알림 설정 훅
export const useUpdateLikeNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: NotificationSettingRequest) => userService.updateLikeNotification(body),
    onSuccess: () => {
      // 프로필 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: userProfileQueryKey });
    },
  });
};
