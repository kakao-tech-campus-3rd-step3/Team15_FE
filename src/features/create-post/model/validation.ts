import { z } from 'zod';

export const zCreatePost = z.object({
  title: z
    .string()
    .min(2, '제목은 2자 이상 입력해주세요')
    .max(100, '제목은 100자 이내로 입력해주세요'),
  content: z
    .string()
    .min(10, '내용은 10자 이상 입력해주세요')
    .max(5000, '내용은 5,000자 이내로 입력해주세요'),
  anonymous: z.boolean(),
  categoryCode: z.string().min(1, '카테고리를 선택해주세요'),
});

export type CreatePostInput = z.infer<typeof zCreatePost>;
