import { usePostDetailQuery } from '@/entities/post/model/usePostDetail';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Button } from '@/shared/ui/shadcn/button';
import { useState } from 'react';
import CommentList from '@/entities/comment/ui/CommentList';
import { PostDetail } from '@/entities/post/ui/PostDetail';
import { useToggleLike } from '@/features/like-post';
import { useCreateComment } from '@/features/add-comment/model/useCreateComment';

type Props = {
  postId: number;
};

export function PostDetailContent({ postId }: Props) {
  const { data } = usePostDetailQuery(postId);
  const { mutate } = useToggleLike();
  const { mutate: createComment } = useCreateComment(postId);
  const [value, setValue] = useState('');

  return (
    <div className='space-y-6'>
      <PostDetail post={data} onClickLike={(postId: number) => mutate(postId)} />

      {/* 댓글 작성 박스 */}
      <Card>
        <CardHeader>
          <CardTitle>댓글 추가</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Textarea
            placeholder='응원의 메시지를 남겨주세요...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='flex justify-end'>
            <Button onClick={() => {}}>댓글작성</Button>
          </div>
        </CardContent>
      </Card>

      {/* 댓글 리스트 */}
      <CommentList postId={postId} />
    </div>
  );
}

export default PostDetailContent;
