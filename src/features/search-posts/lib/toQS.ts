import type { Params } from '@/widgets/PostList/model/type';

export function toQS(params: Params) {
  const qs = new URLSearchParams();
  const { category, keyword, startDate, endDate, page, size, sort } = params;
  if (category && category !== 'ALL') qs.set('category', String(category));
  if (keyword) qs.set('keyword', keyword);
  if (startDate) qs.set('startDate', startDate);
  if (endDate) qs.set('endDate', endDate);
  qs.set('page', String(page ?? 0));
  qs.set('size', String(size ?? 10));
  qs.set('sort', sort ?? 'createdAt,desc');
  return qs.toString();
}
