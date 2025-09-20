import type { CategoryCode } from '@/entities/post';

export type Props = {
  className?: string;
  category?: CategoryCode;
  setCategory?: (code: CategoryCode) => void;
};
