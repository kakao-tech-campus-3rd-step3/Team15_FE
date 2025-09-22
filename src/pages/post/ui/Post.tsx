import { CreatePostForm } from '@/features/create-post';
import { LandingPageFilterTabs } from '@/features/landing-page-filter-post';
import { useFilter } from '@/features/landing-page-filter-post/model/useFilter';
import { SectionHeader, YSButton } from '@/shared/ui';

export function Post() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <SectionHeader title='글쓰기' left={<YSButton size='lg'>돌아가기</YSButton>} />
      <section className='mx-auto max-w-5xl space-y-8 py-10'>
        <LandingPageFilterTabs category={category} setCategory={setCategory} />
        <CreatePostForm category={category} />
      </section>
    </>
  );
}
