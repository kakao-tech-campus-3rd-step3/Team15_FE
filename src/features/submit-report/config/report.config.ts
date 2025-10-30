import type { ReportReasonItem } from '../model/report.type';

export const REPORT_REASONS: ReportReasonItem[] = [
  { reportReasonType: 'AD', displayName: '광고' },
  { reportReasonType: 'SPAM', displayName: '도배' },
  { reportReasonType: 'ABUSE', displayName: '욕설/비하' },
  { reportReasonType: 'OBSCENE', displayName: '음란물' },
  { reportReasonType: 'PRIVACY', displayName: '개인정보 침해' },
  { reportReasonType: 'COPYRIGHT', displayName: '저작권 침해' },
  { reportReasonType: 'OTHER', displayName: '기타' },
];
