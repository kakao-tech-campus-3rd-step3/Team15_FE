interface FallbackErrorProps {
  onRetry?: () => void;
  onHome?: () => void;
}

export default function FallbackError({ onRetry, onHome }: FallbackErrorProps) {
  return (
    <div className='flex flex-col items-center justify-center px-6 py-20 text-center'>
      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
        <span className='text-2xl text-red-600'>⚠️</span>
      </div>
      <h2 className='text-xl font-semibold'>문제가 발생했어요</h2>
      <p className='mt-2 text-sm text-gray-500'>
        데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>

      <div className='mt-6 flex gap-3'>
        <button
          onClick={onRetry ?? (() => window.location.reload())}
          className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50'
        >
          다시 시도
        </button>
        <button
          onClick={onHome ?? (() => (window.location.href = '/'))}
          className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90'
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
