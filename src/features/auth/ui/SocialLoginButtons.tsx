'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { useStartGoogleLogin } from '../api/useStartGoogleLogin';
import { useStartKakaoLogin } from '../api/useStartKakaoLogin';

export const SocialLoginButtons: React.FC = () => {
  const { mutate: startGoogleLogin } = useStartGoogleLogin();
  const { mutate: startKakaoLogin } = useStartKakaoLogin();
  // const socialLogin = (provider: string) => {
  //   console.log(`${provider} 소셜 로그인 시도`);
  //   alert(`${provider} 소셜 로그인 기능은 추후 구현됩니다.`);
  // };

  return (
    <div className='flex gap-4'>
      <Button
        type='button'
        variant='outline'
        className={cn(
          'flex-1 rounded-[8px] border-2 border-gray-200 bg-white py-6 text-gray-700',
          'hover:border-green-500 hover:bg-white',
        )}
        onClick={() => startGoogleLogin()}
      >
        <FcGoogle className='h-5 w-5' />
        Google
      </Button>
      <Button
        type='button'
        variant='outline'
        className={cn(
          'flex-1 rounded-[8px] border-2 border-gray-200 bg-white py-6 text-gray-700',
          'hover:border-green-500 hover:bg-white',
        )}
        onClick={() => startKakaoLogin()}
      >
        <SiKakaotalk className='h-5 w-5 text-yellow-400' />
        Kakao
      </Button>
    </div>
  );
};
