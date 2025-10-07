import { useState } from 'react';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Button } from '@/shared/ui/shadcn/button';
import { Switch } from '@/shared/ui/shadcn/switch';
import { useCreateComment } from '@/features/add-comment/model/useCreateComment';

export function AddCommentForm({ postId }: { postId: number }) {
  const { mutate: createComment, isPending } = useCreateComment(postId);
  const [value, setValue] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const disabled = isPending || !value.trim();

  return (
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
            <Switch
              id='anonymous'
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(Boolean(checked))}
            />
            <span className='text-muted-foreground text-sm'>익명으로 작성</span>
          </div>
          <Button
            disabled={disabled}
            onClick={() => {
              if (!value.trim()) return;
              createComment(
                { content: value, isAnonymous },
                {
                  onSuccess: () => {
                    setValue('');
                    setIsAnonymous(false);
                  },
                },
              );
            }}
          >
            {isPending ? '작성 중...' : '댓글작성'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
