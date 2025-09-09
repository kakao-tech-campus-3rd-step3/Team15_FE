import { items } from '@/shared/config';

export function getActiveItem(pathname: string) {
  return items.find((item) => pathname === item.url || pathname.startsWith(`${item.url}/`));
}
