import React, { useState } from 'react';
import { SocialLoginButtons } from './SocialLoginButtons';
import { InputWithLabel } from '@/shared/ui/form/InputWithLabel';

export const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    termsAgree: false,
  });

  const handleSignup = () => {
    const { email, nickname, password, passwordConfirm, termsAgree } = form;
    if (!email || !nickname || !password || !passwordConfirm) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!termsAgree) {
      alert('이용약관에 동의해주세요.');
      return;
    }
    console.log('회원가입 시도:', form);
    alert('회원가입 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <div>
      <InputWithLabel
        label='이메일'
        type='email'
        placeholder='이메일을 입력해주세요'
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <InputWithLabel
        label='닉네임'
        type='text'
        placeholder='사용할 닉네임을 입력해주세요'
        value={form.nickname}
        onChange={(e) => setForm({ ...form, nickname: e.target.value })}
      />

      <InputWithLabel
        label='비밀번호'
        type='password'
        placeholder='8자 이상 영문, 숫자, 특수문자 포함'
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <InputWithLabel
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호를 다시 입력해주세요'
        value={form.passwordConfirm}
        onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
      />

      <div className='mb-6 flex items-center gap-2'>
        <input
          type='checkbox'
          checked={form.termsAgree}
          onChange={(e) => setForm({ ...form, termsAgree: e.target.checked })}
          className='h-4 w-4'
          id='terms'
        />
        <label htmlFor='terms' className='text-sm text-gray-600'>
          이용약관 및 개인정보처리방침에 동의합니다
        </label>
      </div>
      <button
        onClick={handleSignup}
        className='w-full rounded-lg bg-gradient-to-br from-green-500 to-green-600 py-3 font-semibold text-white transition hover:shadow-lg'
      >
        계정 만들기
      </button>

      <div className='my-6 flex items-center'>
        <div className='h-px flex-1 bg-gray-300'></div>
        <span className='px-4 text-gray-500'>또는</span>
        <div className='h-px flex-1 bg-gray-300'></div>
      </div>

      <SocialLoginButtons />
    </div>
  );
};
