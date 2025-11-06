export function PostStatsSkeleton() {
  return (
    <div className='rounded-xl border border-emerald-100 bg-emerald-50/70 px-6 py-5 pt-10'>
      <ul className='mx-auto grid max-w-3xl animate-pulse grid-cols-3 text-center'>
        {[0, 1, 2].map((i) => (
          <li key={i} className='flex flex-col items-center gap-2'>
            <span className='h-8 w-16 rounded bg-emerald-200' />
            <span className='h-4 w-14 rounded bg-emerald-100' />
          </li>
        ))}
      </ul>
    </div>
  );
}
