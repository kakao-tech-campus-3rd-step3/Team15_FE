import { cn } from '@/shared/lib/utils';
import { TextSkeleton } from '@/shared/ui/skeleton/primitives';

export function PostCardSkeleton({ className }: { className?: string }) {
  return (
    <article className={cn('rounded-xl border p-4 shadow-sm', className)}>
      <TextSkeleton size='xs' width='third' className='mb-2' />
      <TextSkeleton size='lg' width='full' />
      <TextSkeleton size='md' width='threeQuarter' className='mt-2' />
      <TextSkeleton size='md' width='half' className='mt-1' />
      <div className='mt-8 flex items-center justify-end gap-3'>
        <TextSkeleton size='sm' width='third' />
      </div>
    </article>
  );
}
