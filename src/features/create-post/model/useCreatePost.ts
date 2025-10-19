import { useMutation } from '@tanstack/react-query';

import type { CreatePostFormValues } from '../lib/post.scheme';
import { postService } from '@/entities/post/lib/postService';

export function useCreatePost() {
  return useMutation({
    mutationFn: (input: CreatePostFormValues) => postService.createPost(input),
  });
}
