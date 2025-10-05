import { useState } from 'react';
import { Button } from '@/shared/ui/shadcn/button';
import CommentItem from './CommentItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Separator } from '@/shared/ui/shadcn/separator';

import { useComments } from '@/entities/comment/model/useCommentQuery';
import { Fragment } from 'react/jsx-runtime';
import { ReplyList } from '@/features/add-reply/ui/ReplyList';
import { AddReplyForm } from '@/features/add-reply/ui/AddReplyForm';

type Props = {
  postId: number;
  className?: string;
};

export function CommentList({ postId, className }: Props) {
  const { data } = useComments(postId);

  const items = data?.content ?? [];

  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

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
                    }}
                    onSubmit={() => {}}
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
