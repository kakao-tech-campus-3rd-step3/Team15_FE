import { create } from 'zustand';
import type { ProfileData } from './types';

interface ProfileState {
  profileData: ProfileData;
  isChanged: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleInputChange: (field: keyof ProfileData, value: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const initialProfile: ProfileData = {
  nickname: '새싹이',
  introduction: '함께 성장하는 것을 좋아해요! 🌱',
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profileData: initialProfile,
  isChanged: false,
  isModalOpen: false,

  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),

  handleInputChange: (field, value) =>
    set((state) => ({
      profileData: { ...state.profileData, [field]: value },
      isChanged: true,
    })),

  handleSave: () => {
    const { profileData } = get();
    alert('프로필이 성공적으로 저장되었습니다.');
    console.log('프로필 저장:', profileData);
    set({ isChanged: false, isModalOpen: false });
    // 여기서 API 요청 (ex: saveProfile(profileData)) 연결 가능
  },

  handleCancel: () =>
    set({
      profileData: initialProfile,
      isChanged: false,
      isModalOpen: false,
    }),
}));
