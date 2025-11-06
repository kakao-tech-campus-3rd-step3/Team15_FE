import { useState } from 'react';
import { usePostDetailQuery, PostDetail } from '@/entities/post';
import { AddCommentForm } from '@/features/add-comment/';
import { CommentList } from '@/entities/comment';
import { useToggleLike } from '@/features/like-post';
import { EditPostForm, useUpdatePost, type PostEditValues } from '@/features/edit-post';
import { Button } from '@/shared/ui/button';
import { LandingPageFilterTabs } from '@/features/landing';
import { ConfirmDeleteModal } from '@/features/delete-post';
import { useDeletePost } from '@/entities/post/model/useDeletePost';
import { useToggleUnlike } from '@/features/like-post/model/useToggleUnlike';

type Props = { postId: number };

export function PostDetailContent({ postId }: Props) {
  const { data: post } = usePostDetailQuery(postId);
  const { mutate: toggleLike, isPending: likeBusy } = useToggleLike();
  const { mutate: toggleUnlike, isPending: unlikeBusy } = useToggleUnlike();
  const [isRevise, setIsRevise] = useState(false);
  const { mutate: updatePost, isPending } = useUpdatePost(postId);
  const [category, setCategory] = useState(post.postCategory);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost(postId);
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

  const handleDelete = () => {
    deletePost();
    setShowDeleteModal(false);
  };

  return (
    <div className='space-y-6'>
      <PostDetail
        post={post}
        isRevise={isRevise}
        setIsRevise={setIsRevise}
        onClickLike={toggleLike}
        onClickUnlike={toggleUnlike}
        likeDisabled={likeBusy}
        unlikeDisabled={unlikeBusy}
        onClickDelete={() => setShowDeleteModal(true)} // ← 삭제 버튼 트리거 연결
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
      <ConfirmDeleteModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDelete}
        isPending={isDeleting}
      />
    </div>
  );
}
