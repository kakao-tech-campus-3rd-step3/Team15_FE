import { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';

import { useComments } from '@/entities/comment/model/useCommentQuery';
import { Fragment } from 'react/jsx-runtime';
import { ReplyList } from '@/entities/comment/ui/ReplyList';
import { AddReplyForm } from '@/features/add-reply/ui/AddReplyForm';
import { useCreateReply } from '@/features/add-reply/model/useCreateReply';
import CommentItem from '../CommentItem/CommentItem';
import { useDeleteComment } from '../../model/useDeleteComment';
import { useUpdateComment } from '../../model/useUpdateComment';

type CommentListProps = {
  postId: number;
  className?: string;
};

export function CommentList({ postId, className }: CommentListProps) {
  const { data } = useComments(postId);
  const { mutate } = useCreateReply();

  const items = data?.content ?? [];

  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentEditText, setCommentEditText] = useState('');
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: updateCommentMutate } = useUpdateComment();
  const handleClickReply = useCallback((id: number) => {
    setReplyText('');
    setIsAnonymous(false);
    setReplyTargetId((prev) => (prev === id ? null : id));
  }, []);

  const closeReply = useCallback(() => {
    setReplyTargetId(null);
    setReplyText('');
    setIsAnonymous(false);
  }, []);

  const handleSubmitReply = useCallback(
    (id: number) => {
      mutate({ parentId: id, data: { content: replyText, isAnonymous } });
      closeReply();
    },
    [mutate, replyText, isAnonymous, closeReply],
  );

  const startEditComment = useCallback((id: number, currentContent: string) => {
    setEditingCommentId(id);
    setCommentEditText(currentContent);
  }, []);

  const cancelEditComment = useCallback(() => {
    setEditingCommentId(null);
    setCommentEditText('');
  }, []);

  const submitEditComment = useCallback(() => {
    if (!editingCommentId) return;
    updateCommentMutate({
      commentId: editingCommentId,
      body: { content: commentEditText },
      postId,
    });
    setEditingCommentId(null);
    setCommentEditText('');
  }, [updateCommentMutate, editingCommentId, commentEditText, postId]);

  const deleteComment = useCallback(
    (id: number) => {
      if (!confirm('이 댓글을 삭제할까요?')) return;
      deleteCommentMutate(id);
    },
    [deleteCommentMutate],
  );

  return (
    <Card className={className}>
      <CardHeader className='flex-row items-center justify-between space-y-0'>
        <CardTitle>댓글 {items.length}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className='text-muted-foreground text-sm'>아직 댓글이 없어요.</p>
        ) : (
          <ul className='divide-y'>
            {items.map((c) => (
              <Fragment key={c.id}>
                <div className='relative'>
                  <CommentItem
                    comment={c}
                    onClickReply={() => handleClickReply(c.id)}
                    isEditing={editingCommentId === c.id}
                    editText={commentEditText}
                    onEditChange={setCommentEditText}
                    onSubmitEdit={submitEditComment}
                    onCancelEdit={cancelEditComment}
                  />
                  <div className='absolute right-0 top-0 flex flex-wrap gap-1'>
                    {c.isAuthor && (
                      <>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-xs'
                          onClick={() => startEditComment(c.id, c.content ?? '')}
                        >
                          수정
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-xs'
                          onClick={() => deleteComment(c.id)}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-xs'
                      // onClick={() => deleteComment(c.id)}
                    >
                      신고
                    </Button>
                  </div>
                </div>

                {/* 여기가 답글적기/ */}
                {replyTargetId === c.id && (
                  <AddReplyForm
                    value={replyText}
                    onChange={setReplyText}
                    onCancel={closeReply}
                    onSubmit={() => handleSubmitReply(c.id)}
                    isAnonymous={isAnonymous}
                    onToggleAnonymous={setIsAnonymous}
                    disabled={!replyText.trim()}
                    autoFocus
                  />
                )}

                {/* 여기는 대댓글 */}
                <ReplyList parentId={c.id} />
                <Separator />
              </Fragment>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
