import { useEffect, useState } from 'react';

function LoginPanel() {
  const read = () =>
    typeof localStorage !== 'undefined' && localStorage.getItem('app:isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(read());

  // Listen to auth change events (from DevPanel buttons or other tabs)
  useEffect(() => {
    const handle = () => setIsLoggedIn(read());
    window.addEventListener('auth:change', handle);
    window.addEventListener('storage', handle);
    return () => {
      window.removeEventListener('auth:change', handle);
      window.removeEventListener('storage', handle);
    };
  }, []);

  const setAuth = (next: boolean) => {
    localStorage.setItem('app:isLoggedIn', String(next));
    window.dispatchEvent(new Event('auth:change'));
    setIsLoggedIn(next);
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-medium'>상태: {isLoggedIn ? '로그인됨' : '로그아웃됨'}</span>
      {!isLoggedIn ? (
        <button
          onClick={() => setAuth(true)}
          className='rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600'
        >
          로그인(모의)
        </button>
      ) : (
        <button
          onClick={() => setAuth(false)}
          className='rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600'
        >
          로그아웃(모의)
        </button>
      )}
    </div>
  );
}

export default LoginPanel;
