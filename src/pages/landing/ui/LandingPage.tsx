import { FilterTabs } from '@/widgets/FilterTabs';
import { HeroSection } from '@/widgets/HeroSection';
// import { PostList } from "@/widgets/PostList";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FilterTabs />
      {/* // <PostList className='mt-8' /> */}
    </>
  );
}
