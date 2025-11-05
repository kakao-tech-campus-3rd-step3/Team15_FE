import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { UserSummary } from '../model/header.type';

export async function getHeaderData(): Promise<UserSummary> {
  const { data } = await axiosInstance.get<UserSummary>('/users/me/summary');
  return data;
}
