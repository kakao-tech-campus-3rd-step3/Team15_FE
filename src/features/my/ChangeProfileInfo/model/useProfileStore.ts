import { create } from 'zustand';
import type { ProfileData } from './types';

interface ProfileState {
  profileData: ProfileData;
  isChanged: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setProfileData: (data: ProfileData) => void;
  handleInputChange: (field: keyof ProfileData, value: string) => void;
  handleCancel: () => void;
}

const initialProfile: ProfileData = {
  nickname: '새싹이',
  introduction: '함께 성장하는 것을 좋아해요! 🌱',
};

export const useProfileStore = create<ProfileState>((set) => ({
  profileData: initialProfile,
  isChanged: false,
  isModalOpen: false,

  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),

  setProfileData: (data: ProfileData) => set({ profileData: data, isChanged: false }),

  handleInputChange: (field, value) =>
    set((state) => ({
      profileData: { ...state.profileData, [field]: value },
      isChanged: true,
    })),

  handleCancel: () =>
    set({
      profileData: initialProfile,
      isChanged: false,
      isModalOpen: false,
    }),
}));
