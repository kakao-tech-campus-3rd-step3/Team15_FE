import { axiosInstance } from '@/shared/api/base/axiosInstance';

export interface SendEmailResponse {
  newCode: boolean;
}
export type VerifyEmailResponse = object;
export interface EmailError {
  status: number;
  code: string;
  message: string;
}

export const sendEmailCodeApi = async (email: string): Promise<SendEmailResponse> => {
  const res = await axiosInstance.post('/auth/email/send', { email });
  return res.data;
};

export const verifyEmailCodeApi = async (
  email: string,
  code: string,
): Promise<VerifyEmailResponse> => {
  const res = await axiosInstance.post('/auth/email/verify', { email, code });
  return res.data;
};
