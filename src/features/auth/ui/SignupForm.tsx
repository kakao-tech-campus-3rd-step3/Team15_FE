import React from 'react';
import { SocialLoginButtons } from './SocialLoginButtons';
import { InputWithLabel } from '@/shared/ui/form/InputWithLabel';
import { useForm } from 'react-hook-form';
import { signupSchema, type SignupFormValues } from '../model/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { postSignup } from '../api/postSignup';
import { AxiosError } from 'axios';

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }: SignupFormProps) => {
  const { mutate: postSignupMutation } = useMutation({
    mutationFn: postSignup,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    postSignupMutation(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          alert('회원가입이 완료되었습니다. 로그인 탭으로 이동합니다.');
          onSuccess?.();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            //api 명세 없음
            alert('회원가입 실패');
            console.log(error);
          }
        },
      },
    );
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
        placeholder='8자 이상 영문, 숫자, 특수문자 포함'
        {...register('password')}
      />
      {errors.password && <p className='mb-3 text-sm text-red-500'>{errors.password.message}</p>}

      <InputWithLabel
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호를 다시 입력해주세요'
        {...register('passwordConfirm')}
      />
      {errors.passwordConfirm && (
        <p className='text-sm text-red-500'>{errors.passwordConfirm.message}</p>
      )}

      <div className='mb-2 flex items-center gap-2'>
        <input type='checkbox' {...register('termsAgree')} className='h-4 w-4' id='terms' />
        <label htmlFor='terms' className='text-sm text-gray-600'>
          이용약관 및 개인정보처리방침에 동의합니다
        </label>
      </div>
      {errors.termsAgree && <p className='text-sm text-red-500'>{errors.termsAgree.message}</p>}
      <button
        type='submit'
        className='mt-6 w-full rounded-lg bg-gradient-to-br from-green-500 to-green-600 py-3 font-semibold text-white transition hover:shadow-lg'
      >
        계정 만들기
      </button>

      <div className='my-6 flex items-center'>
        <div className='h-px flex-1 bg-gray-300'></div>
        <span className='px-4 text-gray-500'>또는</span>
        <div className='h-px flex-1 bg-gray-300'></div>
      </div>

      <SocialLoginButtons />
    </form>
  );
};
