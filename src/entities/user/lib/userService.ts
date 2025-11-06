import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type {
  UserProfileEditResponse,
  UpdateUserProfileRequest,
  ChangePasswordRequest,
  DeleteAccountRequest,
  NotificationSettingRequest,
} from '../types/userProfile';

export const userService = {
  // 내 프로필 수정 조회
  getProfileEdit: async (): Promise<UserProfileEditResponse> => {
    const { data } = await axiosInstance.get<UserProfileEditResponse>('/users/me/profile/edit');
    return data;
  },

  // 기본 정보 변경
  updateProfile: async (body: UpdateUserProfileRequest): Promise<void> => {
    await axiosInstance.patch('/users/me/profile/edit/info', body);
  },

  // 비밀번호 변경
  changePassword: async (body: ChangePasswordRequest): Promise<void> => {
    await axiosInstance.put('/users/me/password', body);
  },
  // 이메일 주소 변경
  // 이메일 주소 조회
  getEmail: async (): Promise<{ email: string }> => {
    const { data } = await axiosInstance.get<{ email: string }>('/users/me/email');
    return data;
  },

  // 이메일 주소변경 중 인증요청 (이메일 전송)
  // 명세에 따라 성공 시 200 OK (본문 없음) 또는 500 반환 가능하므로 void로 처리
  sendEmailVerification: async (body: { email: string }): Promise<void> => {
    await axiosInstance.post('/users/me/email/send', body);
  },

  // 이메일 주소 변경 요청 (코드 검증)
  // 명세에 따라 성공 시 200 OK이고 응답 바디가 없으므로 void로 처리
  updateEmail: async (body: { email: string; code: string }): Promise<void> => {
    await axiosInstance.put('/users/me/email', body);
  },

  // 회원 탈퇴
  deleteAccount: async (body: DeleteAccountRequest): Promise<void> => {
    await axiosInstance.delete('/users/me', { data: body });
  },

  // 새 댓글 알림 설정
  updateCommentNotification: async (body: NotificationSettingRequest): Promise<void> => {
    await axiosInstance.put('/users/me/notification/comment', body);
  },

  // 좋아요 알림 설정
  updateLikeNotification: async (body: NotificationSettingRequest): Promise<void> => {
    await axiosInstance.put('/users/me/notification/like', body);
  },
};
