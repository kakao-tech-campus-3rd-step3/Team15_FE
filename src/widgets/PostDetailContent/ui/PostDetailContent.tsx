import { useState } from 'react';
import { usePostDetailQuery } from '@/entities/post/model/usePostDetail';
import { PostDetail } from '@/entities/post/ui/PostDetail';
import { AddCommentForm } from '@/features/add-comment/ui/AddCommentForm';
import CommentList from '@/entities/comment/ui/CommentList';
import { useToggleLike } from '@/features/like-post';
import { EditPostForm, useUpdatePost, type PostEditValues } from '@/features/edit-post';
import { Button } from '@/shared/ui/button';

type Props = { postId: number };

export function PostDetailContent({ postId }: Props) {
  const { data: post } = usePostDetailQuery(postId);
  const { mutate: toggleLike } = useToggleLike();
  const [isRevise, setIsRevise] = useState(false);
  const { mutate: updatePost, isPending } = useUpdatePost(postId);
  const handleSubmit = (values: PostEditValues) => {
    updatePost(values, {
      onSuccess: () => {
        setIsRevise(false);
      },
      // 필요 시 에러 처리도 여기서
      // onError: (e) => toast.error(e.message),
    });
  };

  return (
    <div className='space-y-6'>
      <PostDetail
        post={post}
        isRevise={isRevise}
        setIsRevise={setIsRevise}
        onClickLike={(id) => toggleLike(id)}
        // 수정 모드일 때 상단 버튼
        reviseActionSlot={
          <>
            <Button type='submit' form='postEditForm' disabled={isPending}>
              {isPending ? '저장 중…' : '완료'}
            </Button>
            <Button variant='outline' onClick={() => setIsRevise(false)} disabled={isPending}>
              취소
            </Button>
          </>
        }
        // 수정 모드일 때 본문 컨텐츠(= 폼) 주입
        actionSlot={
          isRevise && (
            <EditPostForm
              id='postEditForm'
              disabled={isPending}
              defaultValues={{
                title: post.title,
                content: post.content,
                postCategory: post.postCategory,
              }}
              onSubmit={handleSubmit}
            />
          )
        }
      />

      {!isRevise && (
        <>
          <AddCommentForm postId={postId} />
          <CommentList postId={postId} />
        </>
      )}
    </div>
  );
}
