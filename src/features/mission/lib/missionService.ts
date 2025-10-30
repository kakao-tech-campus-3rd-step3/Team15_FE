import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type { MissionResponse, MissionStats } from '../types/mission';

export const missionService = {
  // 오늘 미션 조회
  getTodayMissions: async (): Promise<MissionResponse[]> => {
    const { data } = await axiosInstance.get<MissionResponse[]>('/missions/today');
    return data;
  },

  // 미션 시작
  startMission: async (missionId: number): Promise<void> => {
    await axiosInstance.patch(`/missions/${missionId}/start`);
  },

  // 미션 완료
  completeMission: async (missionId: number): Promise<void> => {
    await axiosInstance.patch(`/missions/${missionId}/complete`);
  },

  // 미션 통계
  getMissionStats: async (): Promise<MissionStats> => {
    const { data } = await axiosInstance.get<MissionStats>('/missions/stats');
    return data;
  },

  // 미션 취소
  cancelMission: async (missionId: number): Promise<void> => {
    await axiosInstance.patch(`/missions/${missionId}/cancel`);
  },
};
