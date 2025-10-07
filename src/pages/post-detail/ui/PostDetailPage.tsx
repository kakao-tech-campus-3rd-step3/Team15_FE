import { SectionHeader, YSButton } from '@/shared/ui';
import { SuspenseBoundary } from '@/shared/ui/suspense/SuspenseBoundary';
import PostDetailContent from '@/widgets/PostDetailContent/ui/PostDetailContent';
import PostDetailContentSkeleton from '@/widgets/PostDetailContent/ui/PostDetailContent.skeleton';

import { useNavigate, useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

export function PostDetailPage() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  return (
    <>
      <section className='mx-8 space-y-6 pb-10 pt-10'>
        <SectionHeader
          title={
            <>
              <FileText className='mr-2 h-6 w-6 text-green-600' />
              게시글 상세정보
            </>
          }
          description='선택한 게시글의 상세 내용을 확인하세요'
          left={
            <YSButton size='lg' onClick={() => navigate(-1)}>
              목록으로
            </YSButton>
          }
        />
      </section>
      <main className='space-y-8 px-4 py-8'>
        <SuspenseBoundary fallback={<PostDetailContentSkeleton />}>
          <PostDetailContent postId={postId} />
        </SuspenseBoundary>
      </main>
    </>
  );
}
