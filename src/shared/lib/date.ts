import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(isoString: string, format = 'YYYY.MM.DD') {
  return dayjs.utc(isoString).tz('Asia/Seoul').format(format);
}

/**
 * 상대 시간 표시용 함수
 * - 1시간 전까지: 분 단위
 * - 하루 전까지: 시간 단위
 * - 그 이후: YYYY.MM.DD 날짜 표시
 */
export function formatDateRelative(isoString: string): string {
  const now = dayjs().tz('Asia/Seoul');
  const date = dayjs.utc(isoString).tz('Asia/Seoul');

  const diffMinutes = now.diff(date, 'minute');
  const diffHours = now.diff(date, 'hour');

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    // 기존 formatDate 함수 활용
    return formatDate(isoString);
  }
}
