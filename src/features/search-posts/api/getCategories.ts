import type { CategoryCode } from '@/entities/post';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

export interface Category {
  code: CategoryCode;
  displayName: string;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await axiosInstance.get<Category[]>('/posts/categories');
  return data;
}
