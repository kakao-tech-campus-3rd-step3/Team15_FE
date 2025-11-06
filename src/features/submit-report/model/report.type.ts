export type ReportRequest = {
  reportType: 'POST' | 'COMMENT';
  targetId: number;
  reasonType: ReportReasonType;
  content?: string;
};

export type ReportReasonType =
  | 'AD'
  | 'SPAM'
  | 'ABUSE'
  | 'OBSCENE'
  | 'PRIVACY'
  | 'COPYRIGHT'
  | 'OTHER';

export type ReportReason = {
  reportReasonType: ReportReasonType;
  displayName: string;
};

export type ReportReasonResponse = ReportReason[];
