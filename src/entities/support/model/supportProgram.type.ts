export interface SupportProgramCountResponse {
  count: number;
}

export interface SupportProgram {
  id: number;
  name: string;
  company: string;
  supportType: string;
  endPoint: string;
}

export interface SupportProgramDetail extends SupportProgram {
  content: string;
  place: string;
}

export interface SupportProgramListResponse {
  items: SupportProgram[];
}
