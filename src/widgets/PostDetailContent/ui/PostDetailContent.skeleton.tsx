import { Skeleton } from '@/shared/ui/shadcn/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';

export function PostDetailContentSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Post detail skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-2/3' />
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-16' />
          </div>
          <Skeleton className='h-24 w-full' />
          <div className='flex gap-4'>
            <Skeleton className='h-4 w-10' />
            <Skeleton className='h-4 w-10' />
            <Skeleton className='h-4 w-10' />
          </div>
        </CardContent>
      </Card>

      {/* Comment input skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-5 w-24' />
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Skeleton className='h-20 w-full' />
          <div className='flex justify-end'>
            <Skeleton className='h-8 w-20' />
          </div>
        </CardContent>
      </Card>

      {/* Comment list skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-5 w-16' />
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex gap-3'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default PostDetailContentSkeleton;
