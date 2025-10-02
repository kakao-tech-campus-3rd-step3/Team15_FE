import { CreatePostForm } from '@/features/create-post';
import { LandingPageFilterTabs } from '@/features/landing-page-filter-post';
import { useFilter } from '@/features/landing-page-filter-post/model/useFilter';
import { SectionHeader, YSButton } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';

export function Post() {
  const { category, setCategory } = useFilter();
  const naviga = useNavigate();
  return (
    <>
      <section className='mx-8 space-y-6 pb-10 pt-10'>
        <SectionHeader
          title={
            <>
              <Pencil className='mr-2 h-6 w-6 text-green-600' />
              글쓰기
            </>
          }
          description='새로운 글을 작성할 수 있습니다'
          left={
            <YSButton size='lg' onClick={() => naviga(-1)}>
              돌아가기
            </YSButton>
          }
        />
      </section>
      <main className='mx-8 space-y-8 rounded-xl border bg-white px-5 py-10 shadow-sm'>
        <LandingPageFilterTabs category={category} setCategory={setCategory} />
        <CreatePostForm category={category} />
      </main>
    </>
  );
}
