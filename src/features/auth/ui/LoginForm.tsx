import React from 'react';
import { SocialLoginButtons } from './SocialLoginButtons';
import { InputWithLabel } from '@/shared/ui/form/InputWithLabel';
import { loginSchema, type LoginFormValues } from '../model/auth.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('로그인 시도:', data);
    alert('로그인 기능은 백엔드 연동 후 구현됩니다.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabel
        label='이메일'
        type='email'
        placeholder='이메일을 입력해주세요'
        {...register('email')}
      />
      {errors.email && <p className='mb-3 text-sm text-red-500'>{errors.email.message}</p>}

      <InputWithLabel
        label='비밀번호'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        {...register('password')}
      />
      {errors.password && <p className='mb-3 text-sm text-red-500'>{errors.password.message}</p>}

      <div className='mb-6 flex items-center gap-2'>
        <input type='checkbox' id='remember' className='h-4 w-4' />
        <label htmlFor='remember' className='text-sm text-gray-600'>
          로그인 상태 유지
        </label>
      </div>
      <button
        type='submit'
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
    </form>
  );
};
