import React, { useEffect, useRef } from 'react';
import { SocialLoginButtons } from './SocialLoginButtons';
import { InputWithLabel } from '@/shared/ui/form/InputWithLabel';
import { useForm } from 'react-hook-form';
import { signupSchema, type SignupFormValues } from '../model/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '../api/useSignup';
import { Check, Clock } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/button';
import { useEmailVerification } from '../lib/useEmailVerification';

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }: SignupFormProps) => {
  // const { mutate: postSignupMutation } = useMutation({
  //   mutationFn: postSignup,
  // });

  const {
    state: emailVerification,
    sendVerificationCode,
    verifyCode,
    reset,
  } = useEmailVerification();
  const signupMutation = useSignup(onSuccess);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  // const [emailVerification, setEmailVerification] = useState<EmailValidation>({
  //   sent: false,
  //   verified: false,
  //   timer: 0,
  //   isLoading: false,
  // });

  const email = watch('email');
  const verificationCode = watch('verificationCode');

  //이메일 변경 시 인증 상태 초기화
  const prevEmailRef = useRef<string>('');
  useEffect(() => {
    if (prevEmailRef.current !== email) {
      reset();
      prevEmailRef.current = email;
    }
  }, [email, reset]);

  const handleSendCode = () => sendVerificationCode(email);

  const handleVerifyCode = async () => {
    const verified = await verifyCode(verificationCode || '');
    if (!verified) setError('verificationCode', { message: '인증번호가 올바르지 않습니다' });
    else clearErrors('verificationCode');
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data: SignupFormValues) => {
    if (!emailVerification.verified) {
      setError('email', { message: '이메일 인증을 완료해주세요' });
      return;
    }
    signupMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-end gap-2'>
        <div className='relative flex-1'>
          <InputWithLabel
            label='이메일'
            type='email'
            placeholder='이메일을 입력해주세요'
            {...register('email')}
          />

          {/* 인증 완료 아이콘 (input 안 우측에 표시) */}
          {emailVerification.verified && (
            <Check className='absolute right-3 top-[65%] h-5 w-5 -translate-y-1/2 text-green-500' />
          )}
        </div>

        <Button
          type='button'
          onClick={handleSendCode}
          disabled={!email || emailVerification.isLoading || emailVerification.verified}
          className='mb-2 h-12 px-4 text-base'
        >
          {emailVerification.isLoading
            ? '발송중...'
            : emailVerification.sent
              ? '재발송'
              : '인증발송'}
        </Button>
      </div>
      {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}

      {emailVerification.sent && !emailVerification.verified && (
        <div className='mt-2 flex items-end gap-2'>
          <div className='relative flex-1'>
            <InputWithLabel
              label='인증번호'
              type='text'
              maxLength={6}
              {...register('verificationCode')}
              placeholder='인증번호 6자리 입력'
            />
            {emailVerification.timer > 0 && (
              <div className='absolute right-3 top-[65%] flex -translate-y-1/2 items-center gap-1 text-orange-500'>
                <Clock className='h-4 w-4' />
                <span className='text-orange-500'>{formatTime(emailVerification.timer)}</span>
              </div>
            )}
          </div>

          <Button
            variant='default'
            type='button'
            onClick={handleVerifyCode}
            disabled={verificationCode?.length !== 6}
            className='mb-2 h-12 bg-blue-500 px-4 text-base text-white hover:bg-blue-600'
          >
            인증확인
          </Button>
        </div>
      )}
      {errors.verificationCode && (
        <p className='text-sm text-red-500'>{errors.verificationCode.message}</p>
      )}

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
