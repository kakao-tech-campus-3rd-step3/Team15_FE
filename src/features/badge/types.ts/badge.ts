// import type { LucideIcon } from 'lucide-react';

// export interface BadgeType {
//   id: number;
//   name: string;
//   description: string;
//   icon: LucideIcon;
//   color: string;
//   status?: 'earned' | 'in-progress' | 'locked';
//   earnedDate?: string;
//   category: string;
//   rarity: string;
//   progress?: number;
//   target?: number;
//   requirement?: s

// export interface BadgeTabsProps {
//   earnedBadges: BadgeType[];
//   progressBadges: BadgeType[];
//   lockedBadges: BadgeType[];
//   allBadges: BadgeType[];
// }

// 공통 배지 타입
export interface BaseBadge {
  name: string;
  kind: 'LOVE_EVANGELIST' | 'DILIGENT_COMMENTER' | 'MISSION_KILLER' | 'PERFECT_ATTENDANCE';
  iconUrl: string;
}

// 획득한 배지 (earned)
export interface EarnedBadge extends BaseBadge {
  earnedAt: string; // ISO 형식: "2025-10-05T02:18:48"
}

// 전체 응답 타입
export interface BadgeResponse {
  earnedBadges: EarnedBadge[];
  unearnedBadges: BaseBadge[];
  allBadges: BaseBadge[];
}

export type BadgeType = (BaseBadge | EarnedBadge) & {
  status: 'earned' | 'unearned';
};
