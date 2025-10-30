import type { MissionCategory, MissionStatus } from '../types/mission';

export const getCategoryInfo = (category: MissionCategory) => {
  const colors = {
    ALL: { text: '전체', color: 'bg-green-500' },
    ROUTINE: { text: '일상', color: 'bg-purple-500' },
    ACTIVITY: { text: '활동', color: 'bg-green-500' },
    COMMUNICATION: { text: '소통', color: 'bg-orange-500' },
    ETC: { text: '기타', color: 'bg-pink-500' },
  };
  return colors[category] || 'bg-gray-500';
};

export const getStatusBadge = (status: MissionStatus) => {
  const badges = {
    NOT_STARTED: { text: '시작', color: 'bg-gray-100 text-gray-700' },
    IN_PROGRESS: { text: '진행중', color: 'bg-blue-100 text-blue-700' },
    COMPLETED: { text: '완료', color: 'bg-green-100 text-gray-500' },
    CANCELLED: { text: '취소됨', color: 'bg-red-100 text-red-700' },
  };
  return badges[status];
};
