import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/shadcn/button';

interface MorePostsButtonProps {
  /** 이동할 경로 */
  to: string;
  /** 버튼 라벨 (기본값: "더보기") */
  label?: string;
  /** Tailwind 클래스 확장 */
  className?: string;
  /** 버튼 크기 (shadcn props) */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** variant (primary/secondary 등) */
  variant?: 'default' | 'outline' | 'ghost' | 'link';
}

export function MorePostsButton({
  to,
  label = '더보기',
  className = 'mb-6 mt-6 flex justify-center',
  size = 'lg',
  variant = 'default',
}: MorePostsButtonProps) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <Button onClick={() => navigate(to)} size={size} variant={variant}>
        {label}
      </Button>
    </div>
  );
}
