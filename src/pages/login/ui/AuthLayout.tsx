import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => (
  <div className='flex h-auto w-full max-w-[1000px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[600px] md:flex-row'>
    {/* 왼쪽 패널 */}
    <div className='relative hidden flex-1 flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-600 p-8 text-white md:flex md:p-12'>
      <div className='absolute -right-24 -top-24 h-48 w-48 rounded-full bg-white/10'></div>
      <div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10'></div>
      <div className='z-10 text-center'>
        <h1 className='mb-6 flex items-center justify-center gap-3 text-4xl font-bold'>
          <svg className='h-10 w-10' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M12 3L2 12h3v8h14v-8h3L12 3zm0 2.8L18 12v7h-3v-6H9v6H6v-7l6-6.2z' />
          </svg>
          휴쉼
        </h1>
        <p className='mb-6 text-lg opacity-90'>편안한 공간에서 마음을 나누세요</p>
        <ul className='space-y-2 text-left'>
          <li>✓ 안전한 익명 소통</li>
          <li>✓ AI 상담 서비스</li>
          <li>✓ 24시간 언제나 접속 가능</li>
          <li>✓ 개인정보 완벽 보호</li>
        </ul>
      </div>
    </div>

    {/* 오른쪽 패널 */}
    <div className='flex min-h-[400px] flex-1 flex-col overflow-y-auto bg-gray-50 p-6 md:p-12'>
      {children}
    </div>
  </div>
);
