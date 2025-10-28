import { useState } from 'react';
import { ActivityHeader } from '@/features/activity';
import { ActivitySearch } from '@/features/activity/ui/ActivitySearch';
import { likedPosts, myComments, myPosts } from '@/features/activity/model/activity.mock';
import { ActivityTabs } from '@/features/activity/ui/ActivityTabs';

export function ActivityPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-5xl space-y-6 px-4'>
        {/* 헤더 */}
        <ActivityHeader
          postCount={myPosts.length}
          commentCount={myComments.length}
          likeCount={likedPosts.length}
        />

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
