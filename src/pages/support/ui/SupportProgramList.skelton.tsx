import { Skeleton } from '@/shared/ui/skeleton';

export function SupportProgramListSkeleton() {
  return (
    <div className='grid gap-6 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className='h-56 rounded-2xl' />
      ))}
    </div>
  );
}
