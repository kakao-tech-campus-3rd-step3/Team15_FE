import { Button } from '@/shared/ui/shadcn/button';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  rows?: number;
};

export function AddReplyForm({
  className,
  value,
  onChange,
  onCancel,
  onSubmit,
  disabled,
  autoFocus,
  placeholder = '답글을 입력하세요…',
  rows = 2,
  ...rest
}: Props) {
  return (
    <div className={cn('mt-2 pl-11', className)}>
      <div className='rounded-md border p-3'>
        <Textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus={autoFocus}
          aria-label='대댓글 입력'
          className='min-h-[88px]'
          {...rest}
        />
        <div className='mt-2 flex items-center justify-end gap-2'>
          <Button type='button' variant='ghost' size='sm' onClick={onCancel}>
            취소
          </Button>
          <Button type='button' size='sm' onClick={onSubmit} disabled={disabled}>
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddReplyForm;
