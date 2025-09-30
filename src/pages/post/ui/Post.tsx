import { CreatePostForm } from '@/features/create-post';
import { LandingPageFilterTabs } from '@/features/landing-page-filter-post';
import { useFilter } from '@/features/landing-page-filter-post/model/useFilter';
import { SectionHeader, YSButton } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';

export function Post() {
  const { category, setCategory } = useFilter();
  const naviga = useNavigate();
  return (
    <>
      <section className='mx-8 space-y-6 pb-10 pt-10'>
        <SectionHeader
          title='글쓰기'
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
