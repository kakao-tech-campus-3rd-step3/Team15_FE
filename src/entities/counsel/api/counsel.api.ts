import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type {
  SendMessageRequest,
  SendMessageResponse,
  StartCounselResponse,
} from '../model/counsel.type';

export async function startCounsel(): Promise<StartCounselResponse> {
  const res = await axiosInstance.post<StartCounselResponse>('/counsel/start');
  // 필요 시 res.headers['x-session-id']도 확인 가능 (보통 body에 들어옴)
  return res.data;
}

export async function sendCounselMessage(sessionId: string, body: SendMessageRequest) {
  const res = await axiosInstance.post<SendMessageResponse>(
    `/counsel/${sessionId}/message`,
    body,
    { headers: { 'X-Session-Id': sessionId } }, // 인터셉터 쓰면 생략 가능
  );
  return res.data;
}

export async function endCounsel(sessionId: string) {
  await axiosInstance.delete(`/counsel/${sessionId}`, {
    headers: { 'X-Session-Id': sessionId },
  });
}
