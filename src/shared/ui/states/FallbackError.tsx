import { useNavigate } from 'react-router-dom';

interface FallbackErrorProps {
  onRetry?: () => void;
  onHome?: () => void;
  error?: unknown;
}

export default function FallbackError({ onRetry, onHome, error }: FallbackErrorProps) {
  const navigate = useNavigate();

  let errorMessage = '알 수 없는 오류가 발생했습니다.';
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className='flex flex-col items-center justify-center px-6 py-20 text-center'>
      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
        <span className='text-2xl text-red-600'>⚠️</span>
      </div>
      <h2 className='text-xl font-semibold'>문제가 발생했어요</h2>
      <p className='mt-2 text-sm text-gray-500'>{errorMessage}</p>

      <div className='mt-6 flex gap-3'>
        <button
          onClick={onRetry ?? (() => window.location.reload())}
          className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50'
        >
          다시 시도
        </button>
        <button
          onClick={onHome ?? (() => navigate('/'))}
          className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90'
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
