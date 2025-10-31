import { axiosInstance } from '@/shared/api/base/axiosInstance';
import type {
  SupportProgramCountResponse,
  SupportProgramDetail,
  SupportProgramListResponse,
} from '../model/supportProgram.type';

export const supportService = {
  async getSupportCount(): Promise<SupportProgramCountResponse> {
    const { data } =
      await axiosInstance.get<SupportProgramCountResponse>(`/support-programs/count`);
    return data;
  },
  async getSupportProgramList(): Promise<SupportProgramListResponse> {
    const { data } = await axiosInstance.get<SupportProgramListResponse>(`/support-programs`);
    return data;
  },

  async getSupportProgramDetail(id: number): Promise<SupportProgramDetail> {
    const { data } = await axiosInstance.get<SupportProgramDetail>(`/support-programs/${id}`);
    return data;
  },

  async getSupportProgramCategoryList(category: string): Promise<SupportProgramListResponse> {
    const { data } = await axiosInstance.get<SupportProgramListResponse>(
      `/support-programs/${category}`,
    );
    return data;
  },
};
