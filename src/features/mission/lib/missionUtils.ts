import type { MissionCategory, MissionStatus } from '../types/mission';

export const getCategoryColor = (category: MissionCategory) => {
  const colors = {
    전체: 'bg-green-500',
    마음챙김: 'bg-purple-500',
    운동: 'bg-green-500',
    독서: 'bg-blue-500',
    소통: 'bg-orange-500',
    취미: 'bg-pink-500',
  };
  return colors[category] || 'bg-gray-500';
};

export const getStatusBadge = (status: MissionStatus) => {
  const badges = {
    available: { text: '시작', color: 'bg-gray-100 text-gray-700' },
    in_progress: { text: '진행중', color: 'bg-blue-100 text-blue-700' },
    completed: { text: '완료', color: 'bg-green-100 text-gray-500' },
    cancelled: { text: '취소됨', color: 'bg-red-100 text-red-700' },
  };
  return badges[status];
};
