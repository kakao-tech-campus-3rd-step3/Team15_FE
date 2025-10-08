import { useState } from 'react';
import CommentItem from './CommentItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Separator } from '@/shared/ui/shadcn/separator';

import { useComments } from '@/entities/comment/model/useCommentQuery';
import { Fragment } from 'react/jsx-runtime';
import { ReplyList } from '@/features/add-reply/ui/ReplyList';
import { AddReplyForm } from '@/features/add-reply/ui/AddReplyForm';
import { useCreateReply } from '@/features/add-reply/model/useCreateReply';

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
                <CommentItem
                  comment={c}
                  onClickReply={() => {
                    setReplyText('');
                    setIsAnonymous(false);
                    setReplyTargetId((prev) => (prev === c.id ? null : c.id));
                  }}
                />
                {replyTargetId === c.id && (
                  <AddReplyForm
                    value={replyText}
                    onChange={setReplyText}
                    onCancel={() => {
                      setReplyTargetId(null);
                      setReplyText('');
                      setIsAnonymous(false);
                    }}
                    onSubmit={() => {
                      mutate({ parentId: c.id, data: { content: replyText, isAnonymous } });
                      setReplyTargetId(null);
                      setReplyText('');
                      setIsAnonymous(false);
                    }}
                    isAnonymous={isAnonymous}
                    onToggleAnonymous={setIsAnonymous}
                    disabled={!replyText.trim()}
                    autoFocus
                  />
                )}
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

export default CommentList;
