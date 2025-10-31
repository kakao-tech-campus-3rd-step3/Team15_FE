import { axiosInstance } from '@/shared/api/base/axiosInstance';

export type SendEmailResponse = void;

export type VerifyEmailResponse = void;

export interface EmailError {
  status: number;
  code: string;
  message: string;
}

export const sendEmailCodeApi = async (email: string): Promise<SendEmailResponse> => {
  await axiosInstance.post('/auth/email/send', { email });
};

export const verifyEmailCodeApi = async (
  email: string,
  code: string,
): Promise<VerifyEmailResponse> => {
  await axiosInstance.post('/auth/email/verify', { email, code });
};
