import { useMutation } from '@tanstack/react-query';
import { createPost } from '../api/createPostApi';
import type { CreatePostInput } from './validation';

export function useCreatePost() {
  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
  });
}
