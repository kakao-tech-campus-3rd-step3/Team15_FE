// src/shared/lib/levelUtils.ts
export interface LevelInfo {
  progress: number; // 다음 레벨에 필요한 총 경험치
  remainPercent: number; // 현재 레벨 진행도 (0~100)
}

// src/shared/lib/levelUtils.ts
export const getLevelProgress = (exp: number) => {
  const expPerLevel = 50; // 레벨당 50EXP 필요

  const progress = ((exp % expPerLevel) / expPerLevel) * 100;
  const remainPercent = 100 - progress;

  return {
    progress, // 현재 레벨 진행도 (0~100)
    remainPercent, // 다음 레벨까지 남은 비율 (0~100)
  };
};
