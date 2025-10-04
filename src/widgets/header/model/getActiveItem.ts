import { MENU_ITEMS } from '@/shared/config';

export function getActiveItem(pathname: string) {
  return MENU_ITEMS.find((item) => pathname === item.url || pathname.startsWith(`${item.url}/`));
}
