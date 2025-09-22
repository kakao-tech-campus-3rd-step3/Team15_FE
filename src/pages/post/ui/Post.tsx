import { LandingPageFilterTabs } from '@/features/landing-page-filter-post';
import { useFilter } from '@/features/landing-page-filter-post/model/useFilter';
import { SectionHeader, YSButton } from '@/shared/ui';

export function Post() {
  const { category, setCategory } = useFilter();

  return (
    <>
      <SectionHeader title='글쓰기' left={<YSButton size='lg'>돌아가기</YSButton>} />
      <LandingPageFilterTabs category={category} setCategory={setCategory} />{' '}
    </>
  );
}
