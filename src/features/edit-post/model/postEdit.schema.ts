import { z } from 'zod';

export const postEditSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다.').max(100),
  content: z.string().min(1, '내용은 필수입니다.'),
  postCategory: z.any().optional(),
});

export type PostEditValues = z.infer<typeof postEditSchema>;
