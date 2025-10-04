import { usePostDetailQuery } from '@/entities/post/model/usePostDetail';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Button } from '@/shared/ui/shadcn/button';
import { Label } from '@/shared/ui/shadcn/label';
import { useState } from 'react';
import CommentList from '@/entities/comment/ui/CommentList';
import { PostDetail } from '@/entities/post/ui/PostDetail';
import { useToggleLike } from '@/features/like-post';
import { useCreateComment } from '@/features/add-comment/model/useCreateComment';
import { Checkbox } from '@/shared/ui/shadcn/checkbox';

type Props = {
  postId: number;
};

export function PostDetailContent({ postId }: Props) {
  const { data } = usePostDetailQuery(postId);
  const { mutate } = useToggleLike();
  const { mutate: createComment } = useCreateComment(postId);
  const [value, setValue] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

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
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='anonymous'
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(Boolean(checked))}
              />
              <Label htmlFor='anonymous'>익명으로 작성</Label>
            </div>
            <Button
              onClick={() => {
                if (!value.trim()) return;
                createComment({ content: value, isAnonymous });
                setValue('');
                setIsAnonymous(false);
              }}
            >
              댓글작성
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 댓글 리스트 */}
      <CommentList postId={postId} />
    </div>
  );
}

export default PostDetailContent;
