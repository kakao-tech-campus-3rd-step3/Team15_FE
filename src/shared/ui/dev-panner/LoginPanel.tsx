import { useAuthStore } from '@/features/auth/model/useAuthStore';

function LoginPanel() {
  const { isLoggedIn, login, logout } = useAuthStore();

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-medium'>상태: {isLoggedIn ? '로그인됨' : '로그아웃됨'}</span>
      {!isLoggedIn ? (
        <button
          onClick={() => login('mock-token')}
          className='rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600'
        >
          로그인(모의)
        </button>
      ) : (
        <button
          onClick={() => logout()}
          className='rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600'
        >
          로그아웃(모의)
        </button>
      )}
    </div>
  );
}

export default LoginPanel;
