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

  const submitEditComment = useCallback(
    async (id: number) => {
      // 예: updateComment({ id, content: commentEditText })
      console.warn('[CommentList] submitEditComment called for', id, commentEditText);
      setEditingCommentId(null);
      setCommentEditText('');
      // 새로고침 필요 시: queryClient.invalidateQueries(...)
    },
    [commentEditText],
  );

  const deleteComment = useCallback(async (id: number) => {
    if (!confirm('이 댓글을 삭제할까요?')) return;
    // 예: deleteComment({ id })
    console.warn('[CommentList] deleteComment called for', id);
    // 새로고침 필요 시: queryClient.invalidateQueries(...)
  }, []);

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
                <div className='relative flex items-start justify-between'>
                  <CommentItem
                    comment={c}
                    onClickReply={() => handleClickReply(c.id)}
                    isEditing={editingCommentId === c.id}
                    editText={commentEditText}
                    onEditChange={setCommentEditText}
                    onSubmitEdit={() => submitEditComment(c.id)}
                    onCancelEdit={cancelEditComment}
                  />
                  <div className='absolute right-0 top-0 flex gap-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-xs'
                      onClick={() => startEditComment(c.id, (c as any).content)}
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
