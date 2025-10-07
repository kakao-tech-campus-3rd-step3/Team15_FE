import { useMutation } from '@tanstack/react-query';
import { createPost } from '../api/createPostApi';
import type { CreatePostFormValues } from '../lib/post.scheme';

export function useCreatePost() {
  return useMutation({
    mutationFn: (input: CreatePostFormValues) => createPost(input),
  });
}
