import { useState } from 'react';
import { Eye, Heart, MessageSquare, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/shared/ui/button';
import type { PostDetailResponse } from '../model/post.type';
import { ReportModal } from '@/features/submit-report/ui/ReportModal';
import { usePostReport } from '@/features/submit-report/model/usePostReport';

type PostDetailProps = {
  post: PostDetailResponse;
  isRevise: boolean;
  setIsRevise: (value: boolean) => void;
  className?: string;
  onClickLike?: (postId: number) => void;
  onClickUnlike?: (postId: number) => void;
  likeDisabled?: boolean;
  unlikeDisabled?: boolean;
  onClickReport?: () => void;
  onClickDelete: () => void;
  actionSlot?: React.ReactNode; // 공유 등
  reviseActionSlot?: React.ReactNode;
};
export function PostDetail({
  post,
  isRevise,
  setIsRevise,
  className,
  onClickLike,
  onClickUnlike,
  likeDisabled,
  unlikeDisabled,
  onClickReport,
  onClickDelete,
  actionSlot,
  reviseActionSlot,
}: PostDetailProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const { mutate: postReport } = usePostReport();
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className='relative'>
        {/* 제목 + 버튼 그룹 */}
        <div className='flex items-start justify-between'>
          <CardTitle className='text-2xl'>{isRevise ? '게시글 수정' : post.title}</CardTitle>

          {post.isAuthor && (
            <div className='flex gap-2'>
              {isRevise ? (
                // 수정 모드: 외부에서 주입한 액션(완료/취소 버튼 등) 표시
                <>{reviseActionSlot}</>
              ) : (
                <>
                  <Button variant='outline' size='sm' onClick={() => setIsRevise(true)}>
                    수정
                  </Button>
                  <Button variant='destructive' size='sm' onClick={onClickDelete}>
                    삭제
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        <CardDescription>
          <div className='mt-2 flex items-center gap-3 text-sm'>
            {/* <Avatar className='h-8 w-8'>
              {post.author ? <AvatarImage src={post.author} alt={`${post.author} avatar`} /> : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar> */}
            <span className='font-medium'>{post.isAnonymous ? '익명' : post.author}</span>
            <Separator orientation='vertical' className='h-4' />
            <time className='text-muted-foreground'>
              {new Date(post.createdAt).toLocaleString()}
            </time>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isRevise ? (
          actionSlot
        ) : (
          <>
            <div className='prose max-w-none whitespace-pre-wrap leading-7'>{post.content}</div>

            <div className='text-muted-foreground mt-6 flex items-center justify-between text-sm'>
              <div className='flex items-center gap-4'>
                <span className='inline-flex items-center gap-1'>
                  <Heart className='h-4 w-4' />
                  {post.likeCount}
                </span>
                <span className='inline-flex items-center gap-1'>
                  <MessageSquare className='h-4 w-4' />
                  {post.commentCount}
                </span>
                <span className='inline-flex items-center gap-1'>
                  <Eye className='h-4 w-4' />
                  {post.viewCount}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  disabled={post.isLiked ? unlikeDisabled : likeDisabled}
                  onClick={() => (post.isLiked ? onClickUnlike?.(post.id) : onClickLike?.(post.id))}
                >
                  {post.isLiked ? (
                    <Heart className='mr-1 h-4 w-4 fill-red-500 text-red-500' />
                  ) : (
                    <Heart className='mr-1 h-4 w-4' />
                  )}
                  좋아요
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    onClickReport?.();
                    setReportOpen(true);
                  }}
                >
                  <Flag className='mr-1 h-4 w-4' />
                  신고
                </Button>
                {actionSlot}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        reportType='POST'
        targetId={post.id}
        onSubmit={(payload) => {
          postReport(payload);
        }}
      />
    </Card>
  );
}
