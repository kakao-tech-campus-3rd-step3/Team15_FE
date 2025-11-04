import { Button } from '@/shared/ui/button';

type ActionsProps = {
  isDeleted: boolean;
  onClickReply?: () => void;
};

export function Actions({ isDeleted, onClickReply }: ActionsProps) {
  if (isDeleted) return null;

  return (
    <div className='mt-2'>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='h-7 px-2 text-xs'
        onClick={onClickReply}
      >
        답글
      </Button>
    </div>
  );
}
