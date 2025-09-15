import { axiosInstance } from '@/shared/api/base/axiosInstance';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export const authService = {
  // 로그인 API 호출
  login: async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return data;
  },

  // 로그아웃 API 호출
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  // 리프레시 토큰으로 액세스 토큰 갱신
  refresh: async (): Promise<RefreshResponse> => {
    const { data } = await axiosInstance.post<RefreshResponse>('/auth/refresh');
    return data;
  },
};
