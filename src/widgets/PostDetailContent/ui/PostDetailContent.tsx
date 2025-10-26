import { useState } from 'react';
import { usePostDetailQuery } from '@/entities/post';
import { PostDetail } from '@/entities/post/';
import { AddCommentForm } from '@/features/add-comment/';
import { CommentList } from '@/entities/comment';
import { useToggleLike } from '@/features/like-post';
import { EditPostForm, useUpdatePost, type PostEditValues } from '@/features/edit-post';
import { Button } from '@/shared/ui/button';
import { LandingPageFilterTabs } from '@/features/landing';

export function PostDetailContent(postId: number) {
  const { data: post } = usePostDetailQuery(postId);
  const { mutate: toggleLike } = useToggleLike();
  const [isRevise, setIsRevise] = useState(false);
  const { mutate: updatePost, isPending } = useUpdatePost(postId);

  const [category, setCategory] = useState(post.postCategory);

  const handleSubmit = (values: PostEditValues) => {
    updatePost(
      { ...values, postCategory: category },
      {
        onSuccess: () => {
          setIsRevise(false);
        },
        // 필요 시 에러 처리도 여기서
        // onError: (e) => toast.error(e.message),
      },
    );
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
            <>
              <LandingPageFilterTabs category={category} setCategory={setCategory} />
              <EditPostForm
                id='postEditForm'
                disabled={isPending}
                defaultValues={{
                  title: post.title,
                  content: post.content,
                }}
                onSubmit={handleSubmit}
              />
            </>
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
