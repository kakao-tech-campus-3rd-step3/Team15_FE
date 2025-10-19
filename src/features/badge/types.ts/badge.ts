import type { LucideIcon } from 'lucide-react';

export interface BadgeType {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status?: 'earned' | 'in-progress' | 'locked';
  earnedDate?: string;
  category: string;
  rarity: string;
  progress?: number;
  target?: number;
  requirement?: string;
}

export interface BadgeTabsProps {
  earnedBadges: BadgeType[];
  progressBadges: BadgeType[];
  lockedBadges: BadgeType[];
  allBadges: BadgeType[];
}
