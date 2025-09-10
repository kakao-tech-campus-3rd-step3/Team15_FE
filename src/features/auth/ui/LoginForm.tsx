import React, { useState } from 'react';
import { SocialLoginButtons } from './SocialLoginButtons';

export const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    console.log('로그인 시도:', form);
    alert('로그인 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div>
      <div className='mb-6'>
        <label className='mb-2 block font-medium'>이메일</label>
        <input
          type='email'
          placeholder='이메일을 입력해주세요'
          className='w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:outline-none'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className='mb-6'>
        <label className='mb-2 block font-medium'>비밀번호</label>
        <input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          className='w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:outline-none'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className='mb-6 flex items-center gap-2'>
        <input type='checkbox' id='remember' className='h-4 w-4' />
        <label htmlFor='remember' className='text-sm text-gray-600'>
          로그인 상태 유지
        </label>
      </div>
      <button
        onClick={handleLogin}
        className='w-full rounded-lg bg-gradient-to-br from-green-500 to-green-600 py-3 font-semibold text-white transition hover:shadow-lg'
      >
        로그인
      </button>

      <div className='my-6 flex items-center'>
        <div className='h-px flex-1 bg-gray-300'></div>
        <span className='px-4 text-gray-500'>또는</span>
        <div className='h-px flex-1 bg-gray-300'></div>
      </div>

      <SocialLoginButtons />
      <div className='mt-4 text-center'>
        <a href='#' className='font-medium text-green-600'>
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </div>
  );
};
