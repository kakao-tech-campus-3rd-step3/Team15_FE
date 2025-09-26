'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { useStartGoogleLogin } from '../api/useStartGoogleLogin';

export const SocialLoginButtons: React.FC = () => {
  const { mutate: startLogin } = useStartGoogleLogin();
  const socialLogin = (provider: string) => {
    console.log(`${provider} 소셜 로그인 시도`);
    alert(`${provider} 소셜 로그인 기능은 추후 구현됩니다.`);
  };

  return (
    <div className='flex gap-4'>
      <Button
        type='button'
        variant='outline'
        className={cn(
          'flex-1 rounded-[8px] border-2 border-gray-200 bg-white py-6 text-gray-700',
          'hover:border-green-500 hover:bg-white',
        )}
        onClick={() => startLogin()}
      >
        <FcGoogle className='h-5 w-5' />
        Google
      </Button>
      <Button
        variant='outline'
        className={cn(
          'flex-1 rounded-[8px] border-2 border-gray-200 bg-white py-6 text-gray-700',
          'hover:border-green-500 hover:bg-white',
        )}
        onClick={() => socialLogin('Kakao')}
      >
        <SiKakaotalk className='h-5 w-5 text-yellow-400' />
        Kakao
      </Button>
    </div>
  );
};
