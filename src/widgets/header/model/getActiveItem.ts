import { MENU_ITEMS } from '@/shared/config';
import { matchPath } from 'react-router-dom';

export function getActiveItem(pathname: string) {
  return MENU_ITEMS.find((item) => {
    if (item.url === '/') {
      return pathname === '/';
    }
    return !!matchPath({ path: item.url, end: false }, pathname);
  });
}
