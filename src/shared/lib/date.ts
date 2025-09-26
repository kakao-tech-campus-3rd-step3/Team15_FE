import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(isoString: string, format = 'YYYY.MM.DD') {
  return dayjs.utc(isoString).tz('Asia/Seoul').format(format);
}
