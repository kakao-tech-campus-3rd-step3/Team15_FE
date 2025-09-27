import { SectionHeader, YSButton } from '@/shared/ui';

export function PostDetailPage() {
  return (
    <>
      <section className='mx-8 space-y-6 pb-10 pt-10'>
        <SectionHeader title='게시글 상세정보' left={<YSButton size='lg'>목록으로</YSButton>} />
      </section>
      <main className='mx-8 space-y-8 rounded-xl border bg-white px-5 py-10 shadow-sm'></main>
    </>
  );
}
