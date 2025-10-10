import type { CategoryCode, PageResponse, PostEntity } from '../model/types';
import { axiosInstance } from '@/shared/api/base/axiosInstance';

type GetPostsParams = {
  code: CategoryCode; // 카테고리 코드
  page?: number; // 기본 0
  size?: number; // 기본 10
};

export async function getPostsByCategory({ code, page = 0, size = 10 }: GetPostsParams) {
  const res = await axiosInstance.get<PageResponse<PostEntity>>(
    `/posts/category/${code}`,
    { params: { page, size } }, // 미지정시 서버 기본값(정렬: createdAt DESC, size 10)
  );
  return res.data;
}
