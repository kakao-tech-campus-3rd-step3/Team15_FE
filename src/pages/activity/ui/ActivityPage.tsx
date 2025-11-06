import { useState } from 'react';
import {
  ActivityHeader,
  ActivitySearch,
  ActivityTabs,
  useActivityComments,
  useActivityLikes,
  useActivityPosts,
  useActivityStats,
} from '@/features/activity';

export function ActivityPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: stats, isPending: statsLoading, isError: statsError } = useActivityStats();
  const { data: myPosts = [], isPending: postsLoading, isError: postsError } = useActivityPosts();
  const {
    data: myComments = [],
    isPending: commentsLoading,
    isError: commentsError,
  } = useActivityComments();
  const {
    data: likedPosts = [],
    isPending: likesLoading,
    isError: likesError,
  } = useActivityLikes();

  const isLoading = statsLoading || postsLoading || commentsLoading || likesLoading;

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center text-gray-500'>로딩 중...</div>
    );
  }

  const isError = statsError || postsError || commentsError || likesError;

  if (isError) {
    return (
      <div className='flex h-screen items-center justify-center text-red-500'>
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-5xl space-y-6 px-4'>
        {/* 헤더 */}
        {stats && (
          <ActivityHeader
            postCount={stats.postCount}
            commentCount={stats.commentCount}
            likesCount={stats.likesCount}
          />
        )}

        {/* 검색 및 필터 */}
        <ActivitySearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* 활동 내역 탭 */}
        <ActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          posts={myPosts}
          comments={myComments}
          likedPosts={likedPosts}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
