import { SectionHeader, YSButton } from '@/shared/ui';
import PostDetailContent from '@/widgets/PostDetailContent/ui/PostDetailContent';
import { useParams } from 'react-router-dom';

export function PostDetailPage() {
  const { id } = useParams();
  const postId = Number(id);

  return (
    <>
      <section className='mx-8 space-y-6 pb-10 pt-10'>
        <SectionHeader title='게시글 상세정보' left={<YSButton size='lg'>목록으로</YSButton>} />
      </section>
      <main className='space-y-8 px-4 py-8'>
        <PostDetailContent
          postId={postId}
          onSubmitComment={async (content) => {
            // TODO: 댓글 작성 API 연동 후 refetch
            console.log('submit comment:', content);
          }}
        />
      </main>
    </>
  );
}
