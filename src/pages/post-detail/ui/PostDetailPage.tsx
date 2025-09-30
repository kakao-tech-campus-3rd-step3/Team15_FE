import { SectionHeader, YSButton } from '@/shared/ui';
import { SuspenseBoundary } from '@/shared/ui/suspense/SuspenseBoundary';
import PostDetailContent from '@/widgets/PostDetailContent/ui/PostDetailContent';
import PostDetailContentSkeleton from '@/widgets/PostDetailContent/ui/PostDetailContent.skeleton';

import { useNavigate, useParams } from 'react-router-dom';

export function PostDetailPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  return (
    <>
      <section className='mx-8 space-y-6 pb-10 pt-10'>
        <SectionHeader
          title='게시글 상세정보'
          left={
            <YSButton size='lg' onClick={() => navigate(-1)}>
              목록으로
            </YSButton>
          }
        />
      </section>
      <main className='space-y-8 px-4 py-8'>
        <SuspenseBoundary fallback={<PostDetailContentSkeleton />}>
          <PostDetailContent
            postId={postId}
            onSubmitComment={async (content) => {
              // TODO: 댓글 작성 API 연동 후 refetch
              console.log('submit comment:', content);
            }}
          />
        </SuspenseBoundary>
      </main>
    </>
  );
}
