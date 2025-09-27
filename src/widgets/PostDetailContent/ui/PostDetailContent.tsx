import PostDetail from '@/entities/post/ui/PostDetail';
// import CommentList from '@/entities/comment/ui/CommentList';

import { usePostDetailQuery } from '@/entities/post/model/usePostDetail';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Button } from '@/shared/ui/shadcn/button';
import { useState } from 'react';

type Props = {
  postId: number;
  onSubmitComment?: (content: string) => Promise<void> | void;
};

export function PostDetailContent({ postId, onSubmitComment }: Props) {
  const { data } = usePostDetailQuery(postId);
  const [value, setValue] = useState('');

  if (!data) return null;

  return (
    <div className='space-y-6'>
      <PostDetail post={data} />

      {/* 댓글 작성 박스 */}
      <Card>
        <CardHeader>
          <CardTitle>대댓글 추가</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Textarea
            placeholder='응원의 메시지를 남겨주세요...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='flex justify-end'>
            <Button
              onClick={async () => {
                if (!value.trim()) return;
                await onSubmitComment?.(value.trim());
                setValue('');
              }}
            >
              댓글작성
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 댓글 리스트 */}
      {/* <CommentList postId={postId} /> */}
    </div>
  );
}

export default PostDetailContent;
