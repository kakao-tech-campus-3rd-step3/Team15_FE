import {
  Trophy,
  Heart,
  MessageCircle,
  Flame,
  Star,
  Calendar,
  Users,
  BookOpen,
  Award,
} from 'lucide-react';

import { BadgeHeader, BadgeStats, BadgeTabs } from '@/features/badge';
import type { BadgeType } from '@/features/badge/types.ts/badge';

export function BadgePage() {
  // 획득한 뱃지 데이터
  const earnedBadges = [
    {
      id: 1,
      name: '첫 글쓰기',
      description: '첫 번째 글을 작성했습니다',
      icon: Trophy,
      color: 'yellow',
      earnedDate: '2024.03.15',
      category: '글쓰기',
      rarity: '일반',
    },
    {
      id: 2,
      name: '7일 연속 접속',
      description: '7일 연속으로 커뮤니티에 접속했습니다',
      icon: Heart,
      color: 'red',
      earnedDate: '2024.03.14',
      category: '활동',
      rarity: '일반',
    },
    {
      id: 3,
      name: '성실한 댓글러',
      description: '댓글을 50개 이상 작성했습니다',
      icon: MessageCircle,
      color: 'blue',
      earnedDate: '2024.03.12',
      category: '소통',
      rarity: '희귀',
    },
    {
      id: 4,
      name: '인기글 작성',
      description: '좋아요 100개 이상 받은 글을 작성했습니다',
      icon: Flame,
      color: 'purple',
      earnedDate: '2024.03.10',
      category: '인기',
      rarity: '희귀',
    },
  ];

  // 진행 중인 뱃지 데이터
  const progressBadges = [
    {
      id: 5,
      name: '베테랑 작성자',
      description: '글을 100개 작성하세요',
      icon: BookOpen,
      color: 'green',
      progress: 12,
      target: 100,
      category: '글쓰기',
      rarity: '전설',
    },
    {
      id: 6,
      name: '소셜 마스터',
      description: '친구를 50명 만드세요',
      icon: Users,
      color: 'indigo',
      progress: 23,
      target: 50,
      category: '소통',
      rarity: '희귀',
    },
    {
      id: 7,
      name: '연속 접속왕',
      description: '30일 연속 접속하세요',
      icon: Calendar,
      color: 'orange',
      progress: 7,
      target: 30,
      category: '활동',
      rarity: '전설',
    },
  ];

  // 잠긴 뱃지 데이터
  const lockedBadges = [
    {
      id: 8,
      name: '커뮤니티 리더',
      description: '???',
      icon: Star,
      color: 'gray',
      category: '특별',
      rarity: '전설',
      requirement: '특별한 조건 달성 필요',
    },
    {
      id: 9,
      name: '전설의 작성자',
      description: '???',
      icon: Award,
      color: 'gray',
      category: '글쓰기',
      rarity: '전설',
      requirement: '숨겨진 조건 달성 필요',
    },
  ];

  // status 필드 추가
  const earnedBadgesWithStatus = earnedBadges.map<BadgeType>((b) => ({
    ...b,
    status: 'earned' as const,
  }));
  const progressBadgesWithStatus = progressBadges.map<BadgeType>((b) => ({
    ...b,
    status: 'in-progress' as const,
  }));
  const lockedBadgesWithStatus = lockedBadges.map<BadgeType>((b) => ({
    ...b,
    status: 'locked' as const,
  }));

  // 전체 뱃지
  const allBadges = [
    ...earnedBadgesWithStatus,
    ...progressBadgesWithStatus,
    ...lockedBadgesWithStatus,
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-6xl space-y-6 px-4'>
        {/* 헤더 */}
        <BadgeHeader />

        {/* 통계 요약 */}
        <BadgeStats
          earnedCount={earnedBadges.length}
          progressCount={progressBadges.length}
          lockedCount={lockedBadges.length}
          allCount={allBadges.length}
        />

        {/* 뱃지 탭 */}
        <BadgeTabs
          earnedBadges={earnedBadgesWithStatus}
          progressBadges={progressBadgesWithStatus}
          lockedBadges={lockedBadgesWithStatus}
          allBadges={allBadges}
        />
      </div>
    </div>
  );
}
